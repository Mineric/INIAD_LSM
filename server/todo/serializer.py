from todo.models import Task
from rest_framework import serializers
from api.serializer import DynamicFieldsModelSerializer

class TaskSerializer (DynamicFieldsModelSerializer):
    class Meta: 
        model = Task
        fields = "__all__"
        extra_kwargs = {'user': {'read_only': True}}

        
    def create(self, validated_data):
        return Task.objects.create(**validated_data)
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.status = validated_data.get('status', instance.status)
        instance.deadline = validated_data.get('deadline', instance.deadline)
        instance.lesson = validated_data.get ('lesson', instance.lesson)
        instance.save()
        return instance
    