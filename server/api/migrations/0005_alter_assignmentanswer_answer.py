# Generated by Django 3.2 on 2022-01-04 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_assignmentanswer_answer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignmentanswer',
            name='answer',
            field=models.TextField(blank=True, default='', null=True),
        ),
    ]
