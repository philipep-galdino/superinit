const CLI = require('clui');
const fs = require('fs');
const git = require('simple-git/promise')();
const touch = require('touch');
const _ = require('lodash');

const Spinner = CLI.Spinner;

const inquirer = require('./inquirer');
const github = require('./github');

module.exports = {
    createRemoteRepo: async () => {
        const gh = github.getInstance();
        const answers = await inquirer.askRepoDetails();

        const data = {
            name: answers.name,
            description: answers.description,
            private: (answers.visibility === 'private')
        };

        const status = new Spinner('Setting up your remote repo...');
        status.start()

        try {
            const response = await gh.repos.createForAuthenticatedUser(data);
            return response.data.ssh_url;
        } finally {
            status.stop();
        }
    }
}