import YouTubeNotifier from "youtube-notification";

const notifier = new YouTubeNotifier({
    hubCallback: 'https://example.com/youtube',
    port: 8080,
    secret: 'Something',
    path: '/youtube'
  });
  notifier.setup();
   
  notifier.on('notified', data => {
    console.log('New Video');
    console.log(
      `${data.channel.name} just uploaded a new video titled: ${data.video.title}`
    );
  });
   
  notifier.subscribe('channel_1');
  notifier.unsubscribe('channel_1');