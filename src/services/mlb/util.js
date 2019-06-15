import { fetchTeams, fetchTeamRoster } from './api';

export async function getRandomRosterId() {
  const teams = await fetchTeams()
  const randomNumber = Math.floor(Math.random() * teams.length) + 1
  console.log('roster id: ', teams[randomNumber].team_id)
  return teams[randomNumber].team_id
}

export async function getRandomPlayerId() {
  const team = await getRandomRosterId()
  const roster = await fetchTeamRoster(team)
  const randomNumber = Math.floor(Math.random() * roster.length) + 1
  return roster[randomNumber].player_id
}