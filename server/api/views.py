from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions
from rest_framework.views import APIView
import api.models as models
import api.serializers as serializers

# Create your views here.
class CreateCourseView(generics.CreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = serializers.CourseSerializer
    # permission_classes = [permissions.IsAuthenticated]

class CreateSchoolView(generics.CreateAPIView):
    queryset = models.School.objects.all()
    serializer_class = serializers.SchoolSerializer
