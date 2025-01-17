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
import pytest

from backend.tests.conftest import MOCK_CLUSTER_ID, MOCK_PROJECT_ID

pytestmark = pytest.mark.django_db


class TestTarget:
    """ 指标：Target 相关测试 """

    def test_list(self, api_client, metric_api_common_patch, target_metric_api_patch):
        """ 测试获取 集群指标总览 接口 """
        response = api_client.get(f'/api/metrics/projects/{MOCK_PROJECT_ID}/clusters/{MOCK_CLUSTER_ID}/targets/')
        assert response.json()['code'] == 0
