# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-12 11:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_auto_20160810_1933'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='username',
            field=models.TextField(default=b''),
        ),
        migrations.AlterField(
            model_name='post',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
