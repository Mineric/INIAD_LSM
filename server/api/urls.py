from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register ('Dashboard', DashBoardViewSet, basename = 'dashboard')
router.register ('Courses', CourseViewSet, basename = 'courses')
urlpatterns = [
    path ('viewset/', include(router.urls)),
    path('create-course/', CreateCourseView.as_view()),
    path('create-school/', CreateSchoolView.as_view()),
    path('whoami/', WhoAmIView.as_view(), name='whoami'), # for testing
]
