from django.db import models
from django.conf import settings

class Post(models.Model):
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField(max_length=10000)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True)
    tags = models.CharField(max_length=1000, blank=True)

    def get_tags(self):
        if str(self.tags):
            return self.tags.split(', ')
        else: return ['None']

    def __unicode__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', null=True)
    name = models.CharField(max_length=1000)
    text = models.TextField(max_length=1000)