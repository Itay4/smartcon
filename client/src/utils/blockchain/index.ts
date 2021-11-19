const ethers = require('ethers')
const utils = ethers.utils

export const createTrainer = async (userAddress: any, trainerName: any, pokemonName: any) => {
  const pokemonTrainerContract = window.pokemonTrainerContract

  trainerName = utils.formatBytes32String(trainerName)
  pokemonName = utils.formatBytes32String(pokemonName)

  let result = {}

  await pokemonTrainerContract.methods
    .createTrainer(trainerName, pokemonName)
    .send({ from: userAddress })
    .then(async (logs: { events: { NewPokemonCreated: { returnValues: any; }; }; }) => {
      const res = logs.events.NewPokemonCreated.returnValues
      result = {
        name: utils.parseBytes32String(res.name),
        dna: res.dna,
        HP: res.HP
      }
      console.log(
        'Create Trainer: ' +
          JSON.stringify(logs.events.NewPokemonCreated.returnValues)
      )
    })

  return result
}

export const battle = async (userAddress: any, pokemonIndex: any) => {
  const pokemonTrainerContract = window.pokemonTrainerContract

  let result

  await pokemonTrainerContract.methods
    .battleWildPokemon(pokemonIndex)
    .send({ from: userAddress })
    .then(async (logs: { events: { NewBattle: { returnValues: any; }[]; }; transactionHash: any; }) => {
      const res = logs.events.NewBattle[0].returnValues
      result = {
        trainerPokemonName: utils.parseBytes32String(res.trainerPokemonName),
        wildPokemonName: utils.parseBytes32String(res.wildPokemonName),
        trainerPokemonHP: res.trainerPokemonHP,
        wildPokemonHP: res.wildPokemonHP,
        battleResult: res.battleResult,
        battleHash: logs.transactionHash
      }
    })

  return result
}

export const trainerPokemonCount = async (userAddress: any, contract?: undefined) => {
  const pokemonTrainerContract = window.pokemonTrainerContract || contract

  let result

  await pokemonTrainerContract.methods
    .trainerPokemonCount(userAddress)
    .call({ from: userAddress })
    .then(async (logs: string) => {
      console.log('Trainer Pokemon Count: ' + logs)
      result = logs
    })
  return result
}

export const listTrainerPokemons = async (
  userAddress: any,
  pokemonCount: number,
  contract?: undefined
) => {
  const pokemonTrainerContract = window.pokemonTrainerContract || contract
  let promiseArr = []
  for (let i = 0; i < pokemonCount; i++) {
    promiseArr.push(
      pokemonTrainerContract.methods
        .listTrainerPokemon(i)
        .call({ from: userAddress })
    )
  }

  const result: { name: any; dna: any; HP: any; pokemonIndex: number; }[] = []

  const pokemons = await Promise.all(promiseArr)

  pokemons.map((pokemon, index) => (
    result.push({
      name: utils.parseBytes32String(pokemon.name),
      dna: pokemon.dna,
      HP: pokemon.HP,
      pokemonIndex: index,
    })
  ))

  return result
}
