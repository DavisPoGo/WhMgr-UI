'use strict';

const express = require('express');
const router = express.Router();

const defaultData = require('../data/default.js');
const map = require('../data/map.js');
const Pokemon = require('../models/pokemon.js');
const PVP = require('../models/pvp.js');
const Raid = require('../models/raid.js');
const Quest = require('../models/quest.js');
const Invasion = require('../models/invasion.js');


router.get(['/', '/index'], async (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    res.render('index', data);
});

router.get('/login', (req, res) => {
    res.redirect('/api/discord/login');
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/login');
    });
});


// Pokemon routes
router.get('/pokemon', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    res.render('pokemon', data);
});

router.get('/pokemon/new', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    data.pokemon = map.getPokemonNameIdsList();
    data.cities = map.buildCityList(req.session.guilds);
    res.render('pokemon-new', data);
});

router.get('/pokemon/edit/:id', async (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    const id = req.params.id;
    data.id = id;
    const pokemon = await Pokemon.getById(id);
    data.pokemon = map.getPokemonNameIdsList();
    data.pokemon.forEach(pkmn => {
        pkmn.selected = parseInt(pkmn.id) === pokemon.pokemonId;
    });
    data.iv = pokemon.minIV;
    data.iv_list = (pokemon.ivList || []).join('\n');
    data.min_lvl = pokemon.minLvl;
    data.max_lvl = pokemon.maxLvl;
    data.genders.forEach(gender => {
        data.selected = gender.id === pokemon.gender;
    });
    data.cities = map.buildCityList(req.session.guilds);
    data.cities.forEach(city => {
        city.selected = city.name === pokemon.city;
    });
    res.render('pokemon-edit', data);
});

router.get('/pokemon/delete/:id', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    data.id = req.params.id;
    res.render('pokemon-delete', data);
});

router.get('/pokemon/delete_all', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    res.render('pokemon-delete-all', data);
});


// PVP routes
router.get('/pvp/new', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    data.pokemon = map.getPokemonNameIdsList();
    data.cities = map.buildCityList(req.session.guilds);
    res.render('pvp-new', data);
});

router.get('/pvp/edit/:id', async (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    const id = req.params.id;
    data.id = id;
    const pvp = await PVP.getById(id);
    data.pokemon = map.getPokemonNameIdsList();
    data.pokemon.forEach(pkmn => {
        pkmn.selected = parseInt(pkmn.id) === pvp.pokemonId;
    });
    data.leagues.forEach(league => {
        league.selected = league.name === pvp.league;
    });
    data.min_rank = pvp.minRank;
    data.min_percent = pvp.minPercent;
    data.cities = map.buildCityList(req.session.guilds);
    data.cities.forEach(city => {
        city.selected = city.name === pvp.city;
    });
    res.render('pvp-edit', data);
});

router.get('/pvp/delete/:id', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    data.id = req.params.id;
    res.render('pvp-delete', data);
});

router.get('/pvp/delete_all', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    res.render('pvp-delete-all', data);
});


// Raid routes
router.get('/raids', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    res.render('raids', data);
});

router.get('/raid/new', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    data.pokemon = map.getPokemonNameIdsList();
    data.cities = map.buildCityList(req.session.guilds);
    res.render('raid-new', data);
});

router.get('/raid/edit/:id', async (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    const id = req.params.id;
    data.id = id;
    const raid = await Raid.getById(id);
    data.pokemon = map.getPokemonNameIdsList();
    data.pokemon.forEach(pkmn => {
        pkmn.selected = parseInt(pkmn.id) === raid.pokemonId;
    });
    data.cities = map.buildCityList(req.session.guilds);
    data.cities.forEach(city => {
        city.selected = city.name === raid.city;
    });
    res.render('raid-edit', data);
});

router.get('/raid/delete/:id', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    data.id = req.params.id;
    res.render('raid-delete', data);
});

router.get('/raids/delete_all', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    res.render('raids-delete-all', data);
});


// Gym routes
router.get('/gym/new', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    //data.cities = map.buildCityList(req.session.guilds);
    res.render('gym-new', data);
});

router.get('/gym/delete/:id', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    data.id = req.params.id;
    res.render('gym-delete', data);
});

router.get('/gyms/delete_all', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    res.render('gyms-delete-all', data);
});


// Quest routes
router.get('/quests', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    res.render('quests', data);
});

router.get('/quest/new', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    data.cities = map.buildCityList(req.session.guilds);
    res.render('quest-new', data);
});

router.get('/quest/edit/:id', async (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    const id = req.params.id;
    data.id = id;
    const quest = await Quest.getById(id);
    data.reward = quest.reward;
    data.cities = map.buildCityList(req.session.guilds);
    data.cities.forEach(city => {
        city.selected = city.name === quest.city;
    });
    res.render('quest-edit', data);
});

router.get('/quest/delete/:id', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    data.id = req.params.id;
    res.render('quest-delete', data);
});

router.get('/quests/delete_all', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    res.render('quests-delete-all', data);
});


// Invasion routes
router.get('/invasions', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    res.render('invasions', data);
});

router.get('/invasion/new', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    data.rewards = map.getGruntRewardIdsList();
    data.cities = map.buildCityList(req.session.guilds);
    res.render('invasion-new', data);
});

router.get('/invasion/edit/:id', async (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    const id = req.params.id;
    data.id = id;
    const invasion = await Invasion.getById(id);
    data.rewards = map.getGruntRewardIdsList();
    data.rewards.forEach(reward => {
        reward.selected = reward.pokemon_id === invasion.rewardPokemonId;
    });
    data.cities = map.buildCityList(req.session.guilds);
    data.cities.forEach(city => {
        city.selected = city.name === invasion.city;
    });
    res.render('invasion-edit', data);
});

router.get('/invasion/delete/:id', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    data.id = req.params.id;
    res.render('invasion-delete', data);
});

router.get('/invasions/delete_all', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    res.render('invasions-delete-all', data);
});


// Settings routes
router.get('/settings', (req, res) => {
    const data = defaultData;
    data.servers.forEach(server => {
        const guilds = req.session.guilds;
        server.show = guilds.includes(server.id);
    });
    res.render('settings', data);
});

module.exports = router;