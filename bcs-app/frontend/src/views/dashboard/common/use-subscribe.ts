/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import { SetupContext, computed, ref, Ref } from '@vue/composition-api'

export interface ISubscribeParams {
    kind: string;
    resource_version: string;
}

export interface IManifestExt {
    [uid: string]: any;
}

export interface IMetaData {
    resourceVersion: string;
}

export interface IManifest {
    metadata?: IMetaData;
    items?: any[];
}

export interface IEvent {
    operate: 'ADDED' | 'DELETED' | 'MODIFIED';
    uid: string;
    manifest_ext: IManifestExt;
    manifest: any[]; // 订阅事件的 manifest 跟 ISubscribeData 的 manifest 不一样
}

export interface ISubscribeData {
    manifest: IManifest;
    manifest_ext: IManifestExt;
}

export interface IUseSubscribeResult {
    initParams: (kind: string, version: string) => void;
    handleSubscribe: () => Promise<void>;
    handleAddSubscribe: (event: IEvent) => void;
    handleDeleteSubscribe: (event: IEvent) => void;
    handleModifySubscribe: (event: IEvent) => void;
}

/**
 * 订阅事件处理
 * @param params
 * @param ctx
 * @returns
 */
export default function useSubscribe (data: Ref<ISubscribeData>, ctx: SetupContext): IUseSubscribeResult {
    const { $route, $store } = ctx.root

    const projectId = computed(() => $route.params.projectId)
    const curClusterId = computed(() => $store.state.curClusterId)

    // const data = ref<ISubscribeData>({
    //     manifest: {},
    //     manifest_ext: {}
    // })

    const subscribeParams = ref<ISubscribeParams>({
        kind: '',
        resource_version: ''
    })

    // 添加事件
    const handleAddSubscribe = (event: IEvent) => {
        const { manifest, uid, manifest_ext } = event
        data.value.manifest.items?.unshift(manifest)
        data.value.manifest_ext[uid] = manifest_ext
    }
    // 删除事件
    const handleDeleteSubscribe = (event: IEvent) => {
        const { uid } = event
        const index = data.value.manifest.items?.findIndex(item => item.metadata.uid === uid)

        if (index !== undefined && index !== -1) {
            data.value.manifest.items?.splice(index, 1)
        }

        if (data.value.manifest_ext[uid]) {
            delete data.value.manifest_ext[uid]
        }
    }
    // 修改事件
    const handleModifySubscribe = (event: IEvent) => {
        const { manifest, uid, manifest_ext } = event
        const index = data.value.manifest.items?.findIndex(item => item.metadata.uid === uid)

        if (index !== undefined && index !== -1) {
            data.value.manifest.items?.splice(index, 1, manifest)
            data.value.manifest_ext[uid] = manifest_ext
        }
    }

    // 订阅事件处理
    const handleSubscribe = async () => {
        if (!subscribeParams.value.kind || !subscribeParams.value.resource_version) return

        const res = await $store.dispatch('dashboard/subscribeList', {
            projectId: projectId.value,
            clusterId: curClusterId.value,
            data: subscribeParams.value
        }).catch(_ => ({ data: { events: [], latest_rv: null } }))

        const { data } = res

        if (data.latest_rv) {
            subscribeParams.value.resource_version = data.latest_rv
        }

        if (!data.events || !data.events.length) {
            return
        }
        // 处理具体订阅事件
        data.events.forEach((event: IEvent) => {
            switch (event.operate) {
                case 'DELETED':
                    handleDeleteSubscribe(event)
                    break
                case 'ADDED':
                    handleAddSubscribe(event)
                    break
                case 'MODIFIED':
                    handleModifySubscribe(event)
                    break
            }
        })
    }

    const initParams = (kind: string, version: string) => {
        subscribeParams.value.kind = kind
        subscribeParams.value.resource_version = version
    }

    return {
        initParams,
        handleSubscribe,
        handleAddSubscribe,
        handleDeleteSubscribe,
        handleModifySubscribe
    }
}
