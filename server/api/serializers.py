# from rest_framework import serializers

# import api.models as models

# class CourseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Course
#         fields = ['id', 'name', 'lecturers', 'school', 'description', 'date_start', 'date_end', 'is_closed', 'cost']
#         read_only_fields = ['lecturers']

# class SchoolSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.School
#         fields = '__all__'
