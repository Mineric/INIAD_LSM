from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include
from .views import *
from .view_groups.assignment_views import * 
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register ('Dashboard', DashBoardViewSet, basename = 'dashboard')
router.register ('Courses', CourseViewSet, basename = 'courses')
router.register ('Lessons', LessonViewSet, basename = 'lessons')
router.register('assignment-form', AssignmentFormViewSet, basename='assignment-form')
router.register('assignment-question', AssignmentQuestionViewSet, basename='assignment-question')
router.register('assignment-answer', AssignmentAnswerViewSet, basename='assignment-question')

urlpatterns = [
    path ('viewset/', include(router.urls)),
    path('create-course/', CreateCourseView.as_view()),
    path('create-school/', CreateSchoolView.as_view()),
    path('whoami/', WhoAmIView.as_view(), name='whoami'), # for testing
]
# H: dev process for media files
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

from django.conf import settings
from django.conf.urls import url
if settings.DEBUG:
    urlpatterns += [
        url (r'^media/(?P<path>.*)$',
            serve,
            {'document_root': settings.MEDIA_ROOT,}),
    ]
    