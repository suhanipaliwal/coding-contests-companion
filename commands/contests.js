const embedMessage = require('../utility/embed message');
const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, SlashCommandNumberOption } = require('discord.js');
const contestsInPaginate = require("../utility/contests-in");

// contests command to view ongoing and upcoming coding contests
module.exports = {
    data: new SlashCommandBuilder()
        .setName('contests')
        .addNumberOption(
            new SlashCommandNumberOption()
                .setName("start")
                .setDescription(
                    "View contests starting in X time"
                )
                .addChoices(
                    { name: '1 day', value: 1 },
                    { name: '1 week', value: 7 },
                )
        )
        .setDescription('View ongoing and upcoming coding contests'),
    async execute(interaction) {
        await interaction.deferReply();

        let days = interaction.options.getNumber("start");
        if (days != null) {
            await contestsInPaginate(interaction, true);
            return;
        }

        // Create the embed and selection box
        const embed = await embedMessage(interaction, 'CODING CONTESTS', 'Select a contest platform using the selection box below. CodeChef, LeetCode, HackerRank, CodeForces, AtCoder, HackerEarth, GeeksforGeeks and Coding Ninjas are the currently available platforms. Support for more platforms coming soon :sparkles:', false, 'https://github.com/roshan1337d/coding-contests-companion', true);
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('contestsSelect')
                    .setPlaceholder('Select contest platform')
                    .addOptions(
                        {
                            label: 'CodeChef',
                            value: 'codechef',
                            emoji: { id: '1024020300834279484' },
                        },
                        {
                            label: 'LeetCode',
                            value: 'leetcode',
                            emoji: { id: '1024019529283674183' },
                        },
                        {
                            label: 'HackerRank',
                            value: 'hackerrank',
                            emoji: { id: '1024019532190339193' },
                        },
                        {
                            label: 'CodeForces',
                            value: 'codeforces',
                            emoji: { id: '1024341762166243348' },
                        },
                        {
                            label: 'AtCoder',
                            value: 'atcoder',
                            emoji: { id: '1025657008688484363' },
                        },
                        {
                            label: 'HackerEarth',
                            value: 'hackerearth',
                            emoji: { id: '1025657011360243782' },
                        },
                        {
                            label: 'Geeksforgeeks',
                            value: 'geeksforgeeks',
                            emoji: { id: '1110941777260711986' }
                        },
                        {
                            label: 'Coding Ninjas',
                            value: 'codingninjas',
                            emoji: { id: '1118598468978618518' }
                        }
                    ),
            );

        // Send the embed with the selection box
        return interaction.editReply({ embeds: [embed], components: [row] });
    },
};