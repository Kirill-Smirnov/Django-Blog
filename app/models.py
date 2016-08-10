from django.db import models
from datetime import datetime

class Post(models.Model):
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(default=datetime.now)
    content = models.TextField(max_length=10000)
    tags = models.CharField(max_length=1000, blank=True)

    def get_tags(self):
        if str(self.tags):
            return self.tags.split(', ')
        else: return ['None']

    def __unicode__(self):
        return self.title