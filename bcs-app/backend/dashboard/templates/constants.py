# -*- coding: utf-8 -*-
#
# Tencent is pleased to support the open source community by making 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
# Copyright (C) 2017-2019 THL A29 Limited, a Tencent company. All rights reserved.
# Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://opensource.org/licenses/MIT
#
# Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
# an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.
#
from django.conf import settings

from backend.resources.constants import K8sResourceKind

# 资源模板相关配置 目录
RESOURCE_TEMPLATE_DIR = f'{settings.BASE_DIR}/backend/resources/templates'
# 模板配置信息 目录
TEMPLATE_CONFIG_DIR = f'{RESOURCE_TEMPLATE_DIR}/configs'
# Demo 配置文件 目录
DEMO_RESOURCE_MANIFEST_DIR = f'{RESOURCE_TEMPLATE_DIR}/manifests'


HAS_DEMO_MANIFEST_RESOURCE_KIND = [
    # workload
    K8sResourceKind.Deployment.value,
    K8sResourceKind.StatefulSet.value,
    K8sResourceKind.DaemonSet.value,
    K8sResourceKind.CronJob.value,
    K8sResourceKind.Job.value,
    K8sResourceKind.Pod.value,
    # network
    K8sResourceKind.Ingress.value,
    K8sResourceKind.Service.value,
    K8sResourceKind.Endpoints.value,
    # configuration
    K8sResourceKind.ConfigMap.value,
    K8sResourceKind.Secret.value,
    # storage
    K8sResourceKind.PersistentVolume.value,
    K8sResourceKind.PersistentVolumeClaim.value,
    K8sResourceKind.StorageClass.value,
    # rbac
    K8sResourceKind.ServiceAccount.value,
]