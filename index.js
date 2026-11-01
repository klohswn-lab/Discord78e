const { Client, GatewayIntentBits, Events, EmbedBuilder } = require('discord.js');
const config = require('./config.json');

// إنشاء البوت
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ]
});

// عندما يصبح البوت جاهز
client.once(Events.ClientReady, () => {
  console.log(`✅ البوت جاهز! تم تسجيل الدخول كـ: ${client.user.tag}`);
});

// حدث دخول عضو جديد
client.on(Events.GuildMemberAdd, async (member) => {
  // تجنب رسالة ترحيب للبوتات نفسها
  if (member.user.bot) return;

  const channel = member.guild.channels.cache.get(config.welcomeChannelId);
  if (!channel) return console.log('⚠️ لم أجد قناة الترحيب! تحقق من المعرف في config.json');

  const welcomeEmbed = new EmbedBuilder()
    .setColor('#2ecc71')
    .setTitle('👋 أهلاً وسهلاً!')
    .setDescription(`مرحباً بك يا ${member} في **${member.guild.name}**! 🎉\nنتمنى لك إقامة سعيدة وممتعة معنا 💖`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
    .addFields(
      { name: '👤 اسم العضو', value: member.user.username, inline: true },
      { name: '🔢 أنت العضو رقم', value: `${member.guild.memberCount}`, inline: true }
    )
    .setTimestamp();

  await channel.send({ content: `${member}`, embeds: [welcomeEmbed] });
});

// تسجيل الدخول
client.login(config.token)
  .catch(err => {
    console.log('❌ خطأ في تسجيل الدخول! تأكد من التوكن');
    console.error(err);
  });