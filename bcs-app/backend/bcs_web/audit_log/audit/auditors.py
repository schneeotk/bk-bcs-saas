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
from dataclasses import asdict

from ..constants import ActivityStatus, ResourceType
from ..models import UserActivityLog
from .context import AuditContext


class Auditor:
    """提供操作审计日志记录功能"""

    def __init__(self, audit_ctx: AuditContext):
        self.audit_ctx = audit_ctx

    def log_raw(self):
        UserActivityLog.objects.create(**asdict(self.audit_ctx))

    def log_succeed(self):
        self._log(ActivityStatus.Succeed)

    def log_failed(self, err_msg: str = ''):
        self._log(ActivityStatus.Failed, err_msg)

    def _log(self, activity_status: str, err_msg: str = ''):
        self._complete_description(activity_status, err_msg)
        self.audit_ctx.activity_status = activity_status
        UserActivityLog.objects.create(**asdict(self.audit_ctx))

    def _complete_description(self, activity_status: str, err_msg: str):
        audit_ctx = self.audit_ctx
        if not audit_ctx.description:
            description_prefix = f'{audit_ctx.activity_type} {audit_ctx.resource_type}'
            if audit_ctx.resource:
                description_prefix = f'{description_prefix} {audit_ctx.resource}'
        else:
            description_prefix = audit_ctx.description

        audit_ctx.description = f'{description_prefix} {ActivityStatus.get_choice_label(activity_status)}'

        if err_msg:
            audit_ctx.description += f': {err_msg}'


class HelmAuditor(Auditor):
    def __init__(self, audit_ctx: AuditContext):
        super().__init__(audit_ctx)
        self.audit_ctx.resource_type = ResourceType.HelmApp
