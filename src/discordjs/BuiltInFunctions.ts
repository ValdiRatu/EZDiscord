import { ChatInputCommandInteraction } from 'discord.js';

export const reply = async (interaction: ChatInputCommandInteraction, ...args: any) => {
    let message = "";
    for (const arg of args) {
        message += `${arg} `;
    }
    await interaction.reply(message);
}

export const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Array operators
export const add = (array: any[], value: any) => array.push(value);

export const remove = (array: any[], index: number) => array.splice(index, 1);

export const get = (array: any[], index: number) => array[index];

export const len = (array: any[]) => array.length;

// return the index of first match
// return -1 if not found
export const find = (array: any[], value: any) => array.indexOf(value);

export const set = (array: any[], index: number, value: any) => array[index] = value;