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
from uuid import uuid4


def decapitalize(s: str) -> str:
    """ 首字母转小写（暂不考虑去除空白字符） """
    return s[:1].lower() + s[1:]


def gen_random_str(length: int = 8):
    """
    随机生成字符串，目前使用 uuid.uuid4 实现，最多支持32位

    :param length: 生成字符串长度，默认 8 位
    :return: 随机字符串
    """
    if length <= 0 or length > 32:
        raise ValueError('指定的随机串长度需在 1-32 的范围内')
    return uuid4().hex[:length]