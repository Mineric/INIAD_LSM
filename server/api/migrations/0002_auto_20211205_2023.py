# Generated by Django 3.2 on 2021-12-05 11:23

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='date_end',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='date_start',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
