from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register ('Dashboard', DashBoardViewSet, basename = 'dashboard')
router.register ('Courses', CourseViewSet, basename = 'courses')
router.register('assignment-form', AssignmentFormViewSet, basename='assignment-form')
router.register('assignment-question', AssignmentQuestionViewSet, basename='assignment-question')
router.register('lesson-assignment-forms', LessonAssignmentFormsViewSet, basename='lesson-assignment-forms')
urlpatterns = [
    path ('viewset/', include(router.urls)),
]
