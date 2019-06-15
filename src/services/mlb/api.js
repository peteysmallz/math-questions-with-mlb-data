/**
 * Returns an Array of the top hitters by hitting stat
 * @param   {stat} the hitting stat ie. 'hr', 'avg'
 * @return  {Array} The top hitters by stat
 */
export async function fetchHittingLeaderboardByStat(stat, count) {
  const HITTING_LEADERBOARD_URL = `http://mlb.mlb.com/pubajax/wf/flow/stats.splayer?season=2017&sort_order=%27desc%27&sort_column=%27${stat}%27&stat_type=hitting&page_type=SortablePlayer&game_type=%27R%27&player_pool=QUALIFIER&season_type=ANY&sport_code=%27mlb%27&results=1000&recSP=1&recPP=${count}`;
  const response = await fetch(HITTING_LEADERBOARD_URL);

  if (response.status === 200) {
    const data = await response.json();
    const parsedData = data.stats_sortable_player.queryResults.row;

    return parsedData;
  }
}

/**
 * Returns an object of player info
 * @param  {id} the player's unique id
 * @return {object}
 */
export async function fetchPlayerInfo(id) {
  const PLAYER_DATA_URL = `https://statsapi.mlb.com/api/v1/people/${id}?hydrate=currentTeam,team,stats(type=[yearByYear,yearByYearAdvanced,careerRegularSeason,careerAdvanced,availableStats](team(league)),leagueListId=mlb_hist)&site=en`;
  const response = await fetch(PLAYER_DATA_URL);

  if (response.status === 200) {
    const data = await response.json();
    const parsedData = data.people[0];

    return parsedData;
  }
}

/**
 * Returns an object of a players stats from this year
 * @param  {id} the player's unique id
 * @return {object}
 */
export async function fetchPlayerStats(id) {
  const PLAYER_DATA_URL = `https://statsapi.mlb.com/api/v1/people/${id}?hydrate=currentTeam,team,stats(type=[yearByYear,yearByYearAdvanced,careerRegularSeason,careerAdvanced,availableStats](team(league)),leagueListId=mlb_hist)&site=en`;
  const response = await fetch(PLAYER_DATA_URL);

  if (response.status === 200) {
    const data = await response.json();
    const parsedData = data.people[0].stats[0].splits.slice(-1).pop().stat;

    console.log(parsedData);

    return parsedData;
  }
}

/**
 * Returns an array of a players from a team
 * @param  {id} a team's unique id (defaulting to the Blue Jays)
 * @return {array}
 */
export async function fetchTeamRoster(id = 141) {
  const TEAM_ROSTER_URL = `http://mlb.mlb.com/pubajax/wf/flow/stats.splayer?season=2019&sort_order=%27desc%27&sort_column=%27ab%27&stat_type=hitting&page_type=SortablePlayer&team_id=${id}&game_type=%27R%27&player_pool=ALL&season_type=ANY&sport_code=%27mlb%27&results=1000&recSP=1&recPP=50`;
  const response = await fetch(TEAM_ROSTER_URL);

  if (response.status === 200) {
    const data = await response.json();
    const parsedData = data.stats_sortable_player.queryResults.row;

    console.log(parsedData);

    return parsedData;
  }
}

/**
 * Returns an array of all MLB team's info
 * @param
 * @return {array}
 */
export async function fetchTeams() {
  const TEAMS_URL = `http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?all_star_sw=%27N%27&sport_code=%27mlb%27&sort_order=%27name_asc%27&season=2019`;
  const response = await fetch(TEAMS_URL);

  if (response.status === 200) {
    const data = await response.json();
    const parsedData = data.team_all_season.queryResults.row;

    console.log(parsedData);

    return parsedData;
  }
}

// "http://losangeles.angels.mlb.com/images/players/525x330/545361.jpg"



