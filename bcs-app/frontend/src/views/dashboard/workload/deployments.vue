<template>
    <BaseLayout title="Deployments" kind="Deployment" category="deployments" type="workloads">
        <template #default="{ curPageData, pageConf, handlePageChange, handlePageSizeChange, handleGetExtData, handleSortChange, gotoDetail }">
            <bk-table
                :data="curPageData"
                :pagination="pageConf"
                @page-change="handlePageChange"
                @page-limit-change="handlePageSizeChange"
                @sort-change="handleSortChange">
                <bk-table-column :label="$t('名称')" prop="metadata.name" min-width="100" sortable :resizable="false">
                    <template #default="{ row }">
                        <bk-button class="bcs-button-ellipsis" text @click="gotoDetail(row)">{{ row.metadata.name }}</bk-button>
                    </template>
                </bk-table-column>
                <bk-table-column :label="$t('命名空间')" prop="metadata.namespace" min-width="100" sortable :resizable="false"></bk-table-column>
                <bk-table-column :label="$t('镜像')" min-width="280" :resizable="false" :show-overflow-tooltip="false">
                    <template slot-scope="{ row }">
                        <span v-bk-tooltips.top="(handleGetExtData(row.metadata.uid, 'images') || []).join('<br />')">
                            {{ (handleGetExtData(row.metadata.uid, 'images') || []).join(', ') }}
                        </span>
                    </template>
                </bk-table-column>
                <bk-table-column label="Ready" width="100" :resizable="false">
                    <template slot-scope="{ row }">{{row.status.readyReplicas || 0}} / {{row.spec.replicas}}</template>
                </bk-table-column>
                <bk-table-column label="Up-to-date" width="110" :resizable="false">
                    <template slot-scope="{ row }">{{row.status.updatedReplicas || 0}}</template>
                </bk-table-column>
                <bk-table-column label="Available" width="100" :resizable="false">
                    <template slot-scope="{ row }">{{row.status.availableReplicas || 0}}</template>
                </bk-table-column>
                <bk-table-column label="Age" width="100" :resizable="false">
                    <template slot-scope="{ row }">
                        <span>{{handleGetExtData(row.metadata.uid, 'age')}}</span>
                    </template>
                </bk-table-column>
            </bk-table>
        </template>

    </BaseLayout>
</template>
<script>
    import { defineComponent } from '@vue/composition-api'
    import BaseLayout from '@open/views/dashboard/common/base-layout'

    export default defineComponent({
        components: { BaseLayout }
    })
</script>
