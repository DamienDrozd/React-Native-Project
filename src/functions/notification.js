import notifee from "@notifee/react-native";



export const onDisplayNotification = async (title, body) => {
    await notifee.requestPermission()
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    console.log('channel créer');
    console.log('title : ', title);
    console.log('body : ', body);
    if (body === undefined) return;
    if (body === null) return;
    if (typeof body != "string") return;
    if (title === undefined) return;
    if (title === null) return;
    if (typeof title != "string") return;

    // Display a notification
    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId,
        // smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
    console.log('notification affichée');
}
