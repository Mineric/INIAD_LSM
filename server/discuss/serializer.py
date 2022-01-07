from .models import *
from rest_framework import serializers
from api.serializer import DynamicFieldsModelSerializer


            
class ReplySerializer(DynamicFieldsModelSerializer):
    poster = serializers.ReadOnlyField (source = 'poster.username')
    poster_id = serializers.ReadOnlyField (source = 'poster.id')
    votes = serializers.SerializerMethodField()
    
    class Meta: 
        model = Reply
        fields = "__all__"
    def get_votes (self, reply):
        return Vote.objects.filter (postTxt = reply).count()
    
class CommentSerializer (DynamicFieldsModelSerializer):
    poster = serializers.ReadOnlyField (source = 'poster.username')
    poster_id = serializers.ReadOnlyField (source = 'poster.id')
    votes = serializers.SerializerMethodField()
    replies = ReplySerializer (many= True)
    class Meta: 
        model = Comment
        fields = "__all__"
    
    def get_votes (self, comment):
        return Vote.objects.filter (postTxt = comment).count()
class VoteSerializer (DynamicFieldsModelSerializer):
    class Meta:
        model = Vote
        # fields = "__all__"
        fields = ["id"]
            