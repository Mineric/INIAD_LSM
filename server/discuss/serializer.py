from .models import *
from rest_framework import serializers
from api.serializer import DynamicFieldsModelSerializer

class CommentSerializer (DynamicFieldsModelSerializer):
    class Meta: 
        model = Comment
        fields = "__all__"