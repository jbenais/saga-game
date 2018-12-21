import React from 'react';
import { connect } from 'react-redux';
import Target from '../components/Target';
import Info from '../components/Info';
import ButtonStart from '../components/ButtonStart';
import ButtonStop from '../components/ButtonStop';


let colorRandom = Math.random();
const colorDifficulty = ['#4BE072', '#FFA500', '#f30000']
// FIXME: maybe, do something about this ?
const mapStateToProps = state => ({
  lives: state.game.lives,
  score: state.game.score,
  isStarted: state.game.isStarted,
  list: state.targets.list
});

const GameLayout = ({ isStarted, lives, score, list, dispatch }) => (
  <div
    style={{
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#21222C',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100vw',
      height: '100vh',
      margin: 'auto'
    }}
  >
    {isStarted ? (
      <React.Fragment>
        <Info lives={lives} score={score} />
        <ButtonStop onClick={() => dispatch({type: 'GAME_END_REQUESTED'})} />
        {
          list.map(target => 
           (<Target 
              x={target.x}
              y={target.y}
              value={target.value}
              color={'#' + Math.floor(colorRandom * 0.3 * target.value * 6356864).toString(16)}
              onClick={() => {
              dispatch({type: 'TARGET_DELETE_REQUESTED', id: target.id})
              dispatch({type: 'GAME_INCREMENT_SCORE_REQUESTED'})
          }}/>) 
            
          )}
      </React.Fragment>
  
    ) : (
      <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
      }}>
        <div> Score: { score } 🥇 </div>
        {[1, 2, 3].map((lvl, i) =>
        (
          <ButtonStart color={colorDifficulty[i]} level={lvl} onClick={() => {
            dispatch({ type: 'GAME_START_REQUESTED', difficulty: lvl });
            colorRandom=Math.random();
          }} />
        ))}
      </div>
    )}
  </div>
);

export default connect(mapStateToProps)(GameLayout);
