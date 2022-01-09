from .models import *
from rest_framework import serializers
from api.serializer import DynamicFieldsModelSerializer


class VoteSerializer (DynamicFieldsModelSerializer):
    class Meta:
        model = Vote
        fields = "__all__"
        extra_kwargs = {'voter': {'read_only': True}}
    def create(self, validated_data):
        return Vote.objects.create(**validated_data)
            
class ReplySerializer(DynamicFieldsModelSerializer):
    poster = serializers.ReadOnlyField (source = 'poster.username')
    poster_id = serializers.ReadOnlyField (source = 'poster.id')
    votes = serializers.SerializerMethodField(required = False)
    
    class Meta: 
        model = Reply
        fields = "__all__"
        extra_kwargs = {'comment_entity': {'read_only': True}}
    def get_votes (self, reply):
        return Vote.objects.filter (postTxt = reply).count()
        
    def create(self, validated_data):
        return Reply.objects.create(**validated_data)
    def update(self, instance, validated_data):
        instance.body = validated_data.get('body', instance.body)
        instance.save()
        return instance
    
        
    
class CommentSerializer (DynamicFieldsModelSerializer):
    poster = serializers.ReadOnlyField (source = 'poster.username')
    poster_id = serializers.ReadOnlyField (source = 'poster.id')
    votes = serializers.SerializerMethodField(required = False)
    replies = ReplySerializer (many= True, required = False)
    class Meta: 
        model = Comment
        fields ="__all__"
        extra_kwargs = {'course': {'read_only': True}}
    
    def create(self, validated_data):
        return Comment.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.body = validated_data.get('body', instance.body)
        instance.save()
        return instance
    def get_votes (self, comment):
        return Vote.objects.filter (postTxt = comment).count()

class DmyCourseSerializer (DynamicFieldsModelSerializer):
    class Meta: 
        model = DmyCourse
        fields = "__all__"
    comments =  CommentSerializer (many = True, required = False)
    
    def create(self, validated_data):
        return DmyCourse(**validated_data)