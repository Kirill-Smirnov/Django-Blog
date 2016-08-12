from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name="index"),
    url(r'^post/(?P<pk>\d+)/$', views.DetailView.as_view()),
    url(r'^new/$', views.CreateView.as_view()),
    url(r'^delete/(?P<pk>\d+)/$', views.DeleteView.as_view())
]
