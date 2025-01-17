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
import functools
import logging

from django.conf import settings

from backend.utils import cache

logger = logging.getLogger(__name__)


class redis_lock(object):  # noqa
    """
    Distributed lock by redis
    """

    def __init__(self, key, timeout, shift=0, redis_client=None):
        self.key = key
        self.timeout = timeout + shift
        self.redis_client = redis_client or cache.rd_client

    def __call__(self, task_definition):
        @functools.wraps(task_definition)
        def wrapper(*args, **kwargs):
            key = "BACKEND::LOCK::{env}::{key}".format(env=settings.PAAS_ENV, key=self.key)
            value = "--lock--"
            if self.redis_client.set(key, value, self.timeout, nx=True):
                return task_definition(*args, **kwargs)

            logger.info('locked %s, %s, just return', key, task_definition)
            return False

        return wrapper
