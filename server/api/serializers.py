from rest_framework import serializers

from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        field = ['id', 'name', 'lecturer', 'description', 'date_start', 'date_end']
        