import 'dotenv/config';
import { REST, Routes, ApplicationCommandOptionType } from 'discord.js';

const registerSlashCommands = async () => {
	const commands = [
		// car-count
		{
			name: 'car-count',
			description: 'Input the vehicle list copy from the game, returns the count of each vehicle type',
		},
		// send-lottery_pack
		{
			name: 'send-lottery_pack',
			description: 'lottery_pack',
			options: [
				{
					name: 'packname',
					type: ApplicationCommandOptionType.String,
					description: 'Select a Pack',
					placeholder: 'Select a Pack',
					required: true,
					choices: [
						{ "name": "lostedendonatoreggpack", "value": "lostedendonatoreggpack" },
						{ "name": "xduhsee-donator-lotto-pack", "value": "xduhsee-donator-lotto-pack" },
						{ "name": "killer-krixi-donator-lotto-pack", "value": "killer-krixi-donator-lotto-pack" },
						{ "name": "poonani-donator-lotto-pack", "value": "poonani-donator-lotto-pack" },
						{ "name": "stryker99-fishing-lotto-pack", "value": "stryker99-fishing-lotto-pack" },
						{ "name": "nicklasbkp-donator-pack", "value": "nicklasbkp-donator-pack" },
						{ "name": "wisdom-andy-donator-lotto-pack", "value": "wisdom-andy-donator-lotto-pack" },
						{ "name": "cut-rate-crew-donator-lotto-pack", "value": "cut-rate-crew-donator-lotto-pack" },
						{ "name": "usagi-donator-lottopack", "value": "usagi-donator-lottopack" },
						{ "name": "shackpack-donator-lottopack", "value": "shackpack-donator-lottopack" },
						{ "name": "twiztedpack", "value": "twiztedpack" },
						{ "name": "bombthatbigmac-lottopack", "value": "bombthatbigmac-lottopack" },
						{ "name": "cjgomer-donator-lottopack", "value": "cjgomer-donator-lottopack" },
						{ "name": "franks-donator-lottopack", "value": "franks-donator-lottopack" },
						{ "name": "420partypack", "value": "420partypack" },
						{ "name": "plumbus-donator-lottopack", "value": "plumbus-donator-lottopack" },
						{ "name": "b17gunner98th-donator-lotto", "value": "b17gunner98th-donator-lotto1" },
						{ "name": "hannahslotto", "value": "hannahslotto" },
						{ "name": "the_krampus_pack", "value": "the_krampus_pack" },
						{ "name": "the_rath_pack", "value": "the_rath_pack" },
						{ "name": "iykyk", "value": "iykyk" },
						{ "name": "fixyourshit", "value": "fixyourshit" },
						{ "name": "fanboypack", "value": "fanboypack" },
						{ "name": "party_pack", "value": "party_pack" },
						{ "name": "not_quite_a_doctor_pack", "value": "not_quite_a_doctor_pack" }
					],
				},
				{
					name: 'discord-id',
					type: ApplicationCommandOptionType.String,
					description: 'discordID',
					required: true,
				},
			],
		},
		// // send-lottery_packs2
		// {
		// 	name: 'send-lottery_packs2',
		// 	description: 'lottery_packs2',
		// 	options: [
		// 		{
		// 			name: 'packname',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'Select a Pack',
		// 			placeholder: 'Select a Pack',
		// 			required: true,
		// 			choices: [
		// 				{ "name": "unlockit", "value": "unlockit" },
		// 				{ "name": "moneymoneymoney!!!", "value": "moneymoneymoney!!!" },
		// 				{ "name": "lockitup", "value": "lockitup" },
		// 				{ "name": "franks-donator-lottopack", "value": "franks-donator-lottopack" },
		// 				{ "name": "killer-krixi-donator-lotto-pack", "value": "killer-krixi-donator-lotto-pack" },
		// 				{ "name": "mochi-donator-lotto-pack", "value": "mochi-donator-lotto-pack" },
		// 				{ "name": "mrlightsdarksidedonatorlottopack", "value": "mrlightsdarksidedonatorlottopack" },
		// 				{ "name": "nenmax-donator-lotto-pack", "value": "nenmax-donator-lotto-pack" },
		// 				{ "name": "plumbus-donator-lottopack", "value": "plumbus-donator-lottopack" },
		// 				{ "name": "rebelsfireintheskylottopack", "value": "rebelsfireintheskylottopack" },
		// 				{ "name": "shackpack-donator-lottopack", "value": "shackpack-donator-lottopack" },
		// 				{ "name": "toans-bigbrain-donator-lotto-pack", "value": "toans-bigbrain-donator-lotto-pack" },
		// 				{ "name": "alxndrs-donator-hobo-lotto-pack", "value": "alxndrs-donator-hobo-lotto-pack" },
		// 				{ "name": "edcorps-lottopack", "value": "edcorps-lottopack" },
		// 				{ "name": "jax-stoner-snak-lotto-pak", "value": "jax-stoner-snak-lotto-pak" },
		// 			],
		// 		},
		// 		{
		// 			name: 'discord-id',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'discordID',
		// 			required: true,
		// 		},
		// 	],
		// },
		// // send-tools_packs
		// {
		// 	name: 'send-tools_packs',
		// 	description: 'tools_packs',
		// 	options: [
		// 		{
		// 			name: 'packname',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'Select a Pack',
		// 			placeholder: 'Select a Pack',
		// 			required: true,
		// 			choices: [
		// 				{ "name": "boltspack", "value": "boltspack" },
		// 				{ "name": "nailspack", "value": "nailspack" },
		// 				{ "name": "toolboxpack", "value": "toolboxpack" },
		// 				{ "name": "crowbarpack", "value": "crowbarpack" },
		// 				{ "name": "shovelpack", "value": "shovelpack" },
		// 				{ "name": "axepack", "value": "axepack" },
		// 				{ "name": "autorepair", "value": "autorepair" },
		// 				{ "name": "lumberjackpack", "value": "lumberjackpack" }
		// 			],
		// 		},
		// 		{
		// 			name: 'discord-id',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'discordID',
		// 			required: true,
		// 		},
		// 	],
		// },
		// // send-materials_packs
		// {
		// 	name: 'send-materials_packs',
		// 	description: 'materials_packs',
		// 	options: [
		// 		{
		// 			name: 'packname',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'Select a Pack',
		// 			placeholder: 'Select a Pack',
		// 			required: true,
		// 			choices: [
		// 				{ "name": "tools", "value": "tools" },
		// 				{ "name": "flag", "value": "flag" }
		// 			],
		// 		},
		// 		{
		// 			name: 'discord-id',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'discordID',
		// 			required: true,
		// 		},
		// 	],
		// },
		// // send-weapons_packs
		// {
		// 	name: 'send-weapons_packs',
		// 	description: 'weapons_packs',
		// 	options: [
		// 		{
		// 			name: 'packname',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'Select a Pack',
		// 			placeholder: 'Select a Pack',
		// 			required: true,
		// 			choices: [
		// 				{ "name": "9mmpack", "value": "9mmpack" },
		// 				{ "name": "improvisedriflerail", "value": "improvisedriflerail" },
		// 				{ "name": "45ammo", "value": "45ammo" },
		// 				{ "name": "hoboshotgunpack", "value": "hoboshotgunpack" },
		// 				{ "name": "hobopistolpack", "value": "hobopistolpack" },
		// 				{ "name": "357pack", "value": "357pack" },
		// 				{ "name": "weaponrepairpack", "value": "weaponrepairpack" },
		// 				{ "name": "andyarcherpack", "value": "andyarcherpack" },
		// 				{ "name": "nicklasbkpcrossbow", "value": "nicklasbkpcrossbow" },
		// 				{ "name": "sdasspack", "value": "sdasspack" },
		// 				{ "name": "blackcat", "value": "blackcat" },
		// 				{ "name": "dikarwolfvintageww2pack", "value": "dikarwolfvintageww2pack" },
		// 				{ "name": "svdpack", "value": "svdpack" },
		// 				{ "name": "m82pack", "value": "m82pack" }
		// 			],
		// 		},
		// 		{
		// 			name: 'discord-id',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'discordID',
		// 			required: true,
		// 		},
		// 	],
		// },// send-vehicle_packs
		// {
		// 	name: 'send-vehicle_packs',
		// 	description: 'vehicle_packs',
		// 	options: [
		// 		{
		// 			name: 'packname',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'Select a Pack',
		// 			placeholder: 'Select a Pack',
		// 			required: true,
		// 			choices: [
		// 				{ "name": "truckcash", "value": "truckcash" },
		// 				{ "name": "carcash", "value": "carcash" },
		// 				{ "name": "bikecash", "value": "bikecash" },
		// 				{ "name": "bicyclecash", "value": "bicyclecash" },
		// 				{ "name": "boatcash", "value": "boatcash" }
		// 			],
		// 		},
		// 		{
		// 			name: 'discord-id',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'discordID',
		// 			required: true,
		// 		},
		// 	],
		// },
		// // send-survivalgear_packs
		// {
		// 	name: 'send-survivalgear_packs',
		// 	description: 'survivalgear_packs',
		// 	options: [
		// 		{
		// 			name: 'packname',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'Select a Pack',
		// 			placeholder: 'Select a Pack',
		// 			required: true,
		// 			choices: [
		// 				{ "name": "heavy", "value": "heavy" },
		// 				{ "name": "medium", "value": "medium" },
		// 				{ "name": "light", "value": "light" },
		// 				{ "name": "welcomepack2", "value": "welcomepack2" },
		// 				{ "name": "compasspack", "value": "compasspack" },
		// 				{ "name": "fannypack", "value": "fannypack" },
		// 				{ "name": "grindingstone", "value": "grindingstone" },
		// 				{ "name": "metalchest", "value": "metalchest" },
		// 				{ "name": "hikingboots", "value": "hikingboots" },
		// 				{ "name": "assaultbackpack", "value": "assaultbackpack" }
		// 			],
		// 		},
		// 		{
		// 			name: 'discord-id',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'discordID',
		// 			required: true,
		// 		},
		// 	],
		// },
		// // send-meds_packs
		// {
		// 	name: 'send-meds_packs',
		// 	description: 'meds_packs',
		// 	options: [
		// 		{
		// 			name: 'packname',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'Select a Pack',
		// 			placeholder: 'Select a Pack',
		// 			required: true,
		// 			choices: [
		// 				{ "name": "antibiotics", "value": "antibiotics" },
		// 				{ "name": "tourniquetpack", "value": "tourniquetpack" },
		// 				{ "name": "ebpack1", "value": "ebpack1" }
		// 			],
		// 		},
		// 		{
		// 			name: 'discord-id',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'discordID',
		// 			required: true,
		// 		},
		// 	],
		// },
		// // send-food_packs
		// {
		// 	name: 'send-food_packs',
		// 	description: 'food_packs',
		// 	options: [
		// 		{
		// 			name: 'packname',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'Select a Pack',
		// 			placeholder: 'Select a Pack',
		// 			required: true,
		// 			choices: [
		// 				{ "name": "bakerpack", "value": "bakerpack" },
		// 				{ "name": "cheeseburgerpack", "value": "cheeseburgerpack" },
		// 				{ "name": "tunasaladpack", "value": "tunasaladpack" },
		// 				{ "name": "beefstewpack", "value": "beefstewpack" },
		// 				{ "name": "waterpack", "value": "waterpack" },
		// 				{ "name": "mrepack", "value": "mrepack" }
		// 			],
		// 		},
		// 		{
		// 			name: 'discord-id',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'discordID',
		// 			required: true,
		// 		},
		// 	],
		// },
		// // send-daily_packs
		// {
		// 	name: 'send-daily_packs',
		// 	description: 'daily_packs',
		// 	options: [
		// 		{
		// 			name: 'packname',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'Select a Pack',
		// 			placeholder: 'Select a Pack',
		// 			required: true,
		// 			choices: [
		// 				{ "name": "dailyfoodandwater", "value": "dailyfoodandwater" },
		// 				{ "name": "daily1", "value": "daily1" },
		// 				{ "name": "daily2", "value": "daily2" },
		// 				{ "name": "daily3", "value": "daily3" },
		// 				{ "name": "daily4", "value": "daily4" },
		// 				{ "name": "daily5", "value": "daily5" }
		// 			],
		// 		},
		// 		{
		// 			name: 'discord-id',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'discordID',
		// 			required: true,
		// 		},
		// 	],
		// },
		// // send-bigspender
		// {
		// 	name: 'send-bigspender',
		// 	description: 'send-bigspender',
		// 	options: [
		// 		{
		// 			name: 'packname',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'Select a Pack',
		// 			placeholder: 'Select a Pack',
		// 			required: true,
		// 			choices: [
		// 				{ "name": "cursedpuppetsuit", "value": "cursedpuppetsuit" },
		// 				{ "name": "cargodrop", "value": "cargodrop" }
		// 			],
		// 		},
		// 		{
		// 			name: 'discord-id',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'discordID',
		// 			required: true,
		// 		},
		// 	],
		// },
		// // send-vote_packs
		// {
		// 	name: 'send-vote_packs',
		// 	description: 'send-vote_packs',
		// 	options: [
		// 		{
		// 			name: 'packname',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'Select a Pack',
		// 			placeholder: 'Select a Pack',
		// 			required: true,
		// 			choices: [
		// 				{ "name": "10vote", "value": "10vote" },
		// 				{ "name": "30vote", "value": "30vote" },
		// 				{ "name": "60vote", "value": "60vote" },
		// 				{ "name": "150vote", "value": "150vote" },
		// 				{ "name": "100voteblack", "value": "100voteblack" },
		// 				{ "name": "100votebrown", "value": "100votebrown" },
		// 				{ "name": "100votegreen", "value": "100votegreen" },
		// 				{ "name": "100votepink", "value": "100votepink" },
		// 				{ "name": "100votewhite", "value": "100votewhite" },
		// 			],
		// 		},
		// 		{
		// 			name: 'discord-id',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'discordID',
		// 			required: true,
		// 		},
		// 	],
		// },
		// // send-raid_packs
		// {
		// 	name: 'send-raid_packs',
		// 	description: 'send-raid_packs',
		// 	options: [
		// 		{
		// 			name: 'packname',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'Select a Pack',
		// 			placeholder: 'Select a Pack',
		// 			required: true,
		// 			choices: [
		// 				{ "name": "raidak74", "value": "raidak74" },
		// 				{ "name": "raidasval", "value": " raidasval" },
		// 				{ "name": "raidclothes", "value": "raidclothes" },
		// 				{ "name": "raidfirework", "value": "raidfirework" },
		// 				{ "name": "raidflag", "value": " raidflag" },
		// 				{ "name": "raidflarealarm", "value": "raidflarealarm" },
		// 				{ "name": "raidgoldlock", "value": "raidgoldlock" },
		// 				{ "name": "raidnvg", "value": "raidnvg" },
		// 				{ "name": "raidpulledpin", "value": "raidpulledpin" },
		// 				{ "name": "raidscrapbag", "value": "raidscrapbag" },
		// 				{ "name": "raidsilentalarm", "value": "raidsilentalarm" },
		// 				{ "name": "raidteargas", "value": "raidteargas" },
		// 				{ "name": "raidump", "value": "raidump" },
		// 				{ "name": "raidvest", "value": "raidvest" },
		// 				{ "name": "raidvss", "value": "raidvss" },
		// 			],
		// 		},
		// 		{
		// 			name: 'discord-id',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'discordID',
		// 			required: true,
		// 		},
		// 	],
		// },
		// // send-admin_packs
		// {
		// 	name: 'send-admin_packs',
		// 	description: 'send-admin_packs',
		// 	options: [
		// 		{
		// 			name: 'packname',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'Select a Pack',
		// 			placeholder: 'Select a Pack',
		// 			required: true,
		// 			choices: [
		// 				{ "name": "basiclock", "value": "basiclock" },
		// 				{ "name": "welcomepack_copy", "value": "welcomepack_copy" },
		// 				{ "name": "welcomepack", "value": "welcomepack" },
		// 				{ "name": "bed", "value": "bed" },
		// 				{ "name": "kitchensinkcleanup", "value": "kitchensinkcleanup" },
		// 				{ "name": "minesweeper", "value": "minesweeper" },
		// 			],
		// 		},
		// 		{
		// 			name: 'discord-id',
		// 			type: ApplicationCommandOptionType.String,
		// 			description: 'Select a Pack',
		// 			placeholder: 'Select a Pack',
		// 			required: true,
		// 			choices: [
		// 				{ "name": "bombthatbigmac", "value": "1064231188035809280" },
		// 				{ "name": "edCorps", "value": "401740966769459201" },
		// 				{ "name": "Rathnierre", "value": "202279773882417152" },
		// 				{ "name": "RELENTLESS665", "value": "368197808928456724" },
		// 				{ "name": "Stryker99", "value": "need id" },
		// 			],
		// 		},
		// 	],
		// },
	];

	const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

	try {
		console.log('Registering slash commands');
		await rest.put(
			Routes.applicationGuildCommands(process.env.BOT_ID, process.env.SERVER_ID),
			{ body: commands }
		);
		console.log('Slash commands registered successfully!');
	} catch (error) {
		console.error(`Error registering slash commands: ${error.message}`);
	}
};

registerSlashCommands();
