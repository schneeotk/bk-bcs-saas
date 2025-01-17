# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2020-01-06 06:55
from __future__ import unicode_literals

from django.db import migrations, models

import backend.templatesets.legacy_apps.configuration.models.mixins


class Migration(migrations.Migration):

    dependencies = [
        ('configuration', '0033_auto_20191103_2342'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ingress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creator', models.CharField(max_length=32, verbose_name='创建者')),
                ('updator', models.CharField(max_length=32, verbose_name='更新者')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('deleted_time', models.DateTimeField(blank=True, null=True)),
                ('config', models.TextField(verbose_name='配置信息')),
                ('name', models.CharField(default='', max_length=255, verbose_name='名称')),
            ],
            options={
                'ordering': ('created',),
                'abstract': False,
            },
            bases=(
                models.Model,
                backend.templatesets.legacy_apps.configuration.models.mixins.MConfigMapAndSecretMixin,
            ),
        ),
        migrations.AlterField(
            model_name='resourcefile',
            name='resource_name',
            field=models.CharField(
                choices=[
                    ('Deployment', 'Deployment'),
                    ('Service', 'Service'),
                    ('ConfigMap', 'ConfigMap'),
                    ('Secret', 'Secret'),
                    ('Ingress', 'Ingress'),
                    ('StatefulSet', 'StatefulSet'),
                    ('DaemonSet', 'DaemonSet'),
                    ('Job', 'Job'),
                    ('HPA', 'HPA'),
                    ('ServiceAccount', 'ServiceAccount'),
                    ('ClusterRole', 'ClusterRole'),
                    ('ClusterRoleBinding', 'ClusterRoleBinding'),
                    ('PodDisruptionBudget', 'PodDisruptionBudget'),
                    ('StorageClass', 'StorageClass'),
                    (('PersistentVolume',), 'PersistentVolume'),
                    ('PersistentVolumeClaim', 'PersistentVolumeClaim'),
                ],
                max_length=32,
            ),
        ),
    ]
