from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include

from .views import *

urlpatterns = [
    path('create-course/', CreateCourseView.as_view()),
    path('create-school/', CreateSchoolView.as_view()),
]
