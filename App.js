/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, StatusBar, TouchableOpacity} from 'react-native';
import Cell from "./src/components/cell";
import Modal from "react-native-modal";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      cellValues :  [["","",""], ["","",""], ["","",""]],
      turnPlayerOne: true,
      playerOneScore: 0,
      playerTwoScore: 0,
      draws:0,
      isBoardModalVisible: false,
      isScoreModalVisible: false
    }
    this.onCellPress = this.onCellPress.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.resetScore = this.resetScore.bind(this);
  }
  componentWillMount(){
  }
  checkWin = function(){
    // console.log(this.state.cellValues);
    let countX=0,countO=0;
    let countX1=0,countO1=0;
    let countBlanks=0;
    //for top to bottom and left to right
    for(let i=0;i<3;i++){
      countX=0;
      countO=0;
      countX1=0;
      countO1=0;
      for(let j=0;j<3;j++){
        if(this.state.cellValues[i][j]=='X')
          countX++;
        if(this.state.cellValues[i][j]=='O')
          countO++;
        if(this.state.cellValues[j][i]=='X')
          countX1++;
        if(this.state.cellValues[j][i]=='O')
          countO1++;
        if(this.state.cellValues[i][j]=='')
          countBlanks++;
      }

      if(countX==3 || countO==3){
        return true;
      }
      if(countX1==3 || countO1==3)
        return true;
    }
    //reset the board.
    if(countBlanks==0){
      this.setState(prevState => ({
        cellValues :  [["","",""], ["","",""], ["","",""]],
        draws: prevState.draws+1,
        turnPlayerOne: !prevState.turnPlayerOne
      }));
      alert("Game resulted in a Draw!");
      return false;
    }

    //for diagonals
    if((this.state.cellValues[0][0] == this.state.cellValues[1][1] && this.state.cellValues[1][1] == this.state.cellValues[2][2])
        && (this.state.cellValues[0][0] == 'X' || this.state.cellValues[0][0] == 'O'))
      return true;
    if((this.state.cellValues[2][0] == this.state.cellValues[1][1] && this.state.cellValues[1][1] == this.state.cellValues[0][2])
        && (this.state.cellValues[2][0] == 'X' || this.state.cellValues[2][0] =='O'))
      return true;

    return false;
  }


  onCellPress = function(position){
    if(this.state.cellValues[position[0]][position[1]] != "") //Already Filled
      return;
    let temp = this.state.cellValues;
    if(this.state.turnPlayerOne){
      temp[position[0]][position[1]] = "X"
    }
    else{ //Second player turn
      temp[position[0]][position[1]] = "O"
    }
    this.setState({
      cellValues: temp
    })

    //check if anybody wins, if yes check and then give a popup and increase the score of the winner.
    if(this.checkWin()){
      if(this.state.turnPlayerOne){
        alert("Player One Wins");
        this.setState( prevState => ({
          playerOneScore: prevState.playerOneScore+1
        }));
      }
      else{
        alert("Player Two Wins");
        this.setState( prevState => ({
          playerTwoScore: prevState.playerTwoScore+1
        }));
      }
      this.setState({
        cellValues :  [["","",""], ["","",""], ["","",""]]
        });
    }

    this.setState( prevState =>({
        turnPlayerOne : !prevState.turnPlayerOne //Toggle the turn
      })
    )
    
  }
  resetScore = function(){
    this.setState({
      cellValues :  [["","",""], ["","",""], ["","",""]],
      turnPlayerOne: true,
      playerOneScore: 0,
      playerTwoScore: 0,
      draws:0,
      isBoardModalVisible: false,
      isScoreModalVisible: false
    });
    console.log("uhuuihuighiui")
  }
  resetBoard = function(){
    this.setState({
      cellValues :  [["","",""], ["","",""], ["","",""]],
      isBoardModalVisible: false,
      isScoreModalVisible: false
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#3DDBA4"
          barStyle="light-content"
        />
        <View style={styles.scorebar}>
          <View style={{flex:1, flexDirection: 'row',marginLeft: 5}}>
            <Text style={styles.scoreText}>{this.state.playerOneScore}</Text>
            <Text style={{color: '#00AF89', fontSize: 35, marginLeft: 4}}>X</Text>
          </View>
          <View style={{flex:5}}>

          </View>
          <View style={{flex:1,flexDirection: 'row'}}>
            <Text style={{color: '#00AF89', fontSize: 35, marginRight: 4}}>O</Text>
            <Text style={styles.scoreText}>{this.state.playerTwoScore}</Text>
          </View>
        </View>
      
        <View>
          <View style={styles.row}>
            <Cell title={this.state.cellValues[0][0]} style={styles.cell} value={[0,0]} onPress={this.onCellPress}/>
            <Cell title={this.state.cellValues[0][1]} style={styles.cell} value={[0,1]} onPress={this.onCellPress}/>
            <Cell title={this.state.cellValues[0][2]} style={styles.cell} value={[0,2]} onPress={this.onCellPress}/>
          </View> 
          <View style={styles.row}>
            <Cell title={this.state.cellValues[1][0]} style={styles.cell} value={[1,0]} onPress={this.onCellPress}/>
            <Cell title={this.state.cellValues[1][1]} style={styles.cell} value={[1,1]} onPress={this.onCellPress}/>
            <Cell title={this.state.cellValues[1][2]} style={styles.cell} value={[1,2]} onPress={this.onCellPress}/>
          </View>
          <View style={styles.row}>
            <Cell title={this.state.cellValues[2][0]} style={styles.cell} value={[2,0]} onPress={this.onCellPress}/>
            <Cell title={this.state.cellValues[2][1]} style={styles.cell} value={[2,1]} onPress={this.onCellPress}/>
            <Cell title={this.state.cellValues[2][2]} style={styles.cell} value={[2,2]} onPress={this.onCellPress}/>
          </View>
        </View>
        <View style={styles.scorebar}>
          <View style={{flex:2,flexDirection: 'row', margin: 5}}>
            <Button
              onPress={() => this.setState({ isScoreModalVisible: true })}
              title="Reset Score"
              color="#00AF89"
            />
          </View>
          <View style={{flex:3, flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
            <Text style={styles.scoreText}>{this.state.draws}</Text>
            <Text style={{color: '#00AF89', fontSize: 30, marginLeft: 4}}>Draws</Text>
          </View>
          <View style={{flex:2,flexDirection: 'row', margin: 5}}>
            <Button
              onPress={() => this.setState({ isBoardModalVisible: true })}
              title="Reset Board"
              color="#00AF89"
            />
          </View>
        </View>
        <Modal isVisible={this.state.isBoardModalVisible}
              onBackdropPress={() => this.setState({ isBoardModalVisible: false })}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}
              backdropColor={'#00000033'}
              backdropOpacity={0.5}>
          <View style={{ flex: 5, justifyContent:'center', alignItems: 'center'}}>
            <View style={{flex:2}}>

            </View>
            <View style={{flex:1, margin:25, padding:20, backgroundColor:'white', justifyContent:'center', alignItems: 'center', borderRadius: 10, elevation: 4}}>
              <Text>Are you sure you want to Reset the Board? This will not impact the existing score.</Text>
              <View style={{flexDirection: 'row', justifyContent:'flex-end', marginTop:10}}>
                <TouchableOpacity onPress={() => this.resetBoard()} style={styles.modalButtons}>
                  <Text style={{color: 'white'}}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ isBoardModalVisible: false })} style={styles.modalButtons}>
                  <Text style={{color: 'white'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex:2}}>

            </View>
          </View>
        </Modal>
        <Modal isVisible={this.state.isScoreModalVisible}
              onBackdropPress={() => this.setState({ isScoreModalVisible: false })}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}
              backdropColor={'#00000033'}
              backdropOpacity={0.5}>
          <View style={{ flex: 5, justifyContent:'center', alignItems: 'center' }}>
            <View style={{flex:2}}>

            </View>
            <View style={{flex:1, margin:25, padding:20, backgroundColor:'white', justifyContent:'center', alignItems: 'center', borderRadius: 10, elevation: 4}}>
              <Text>Are you sure you want to Reset the Score and the Board?</Text>
              <View style={{flexDirection: 'row', justifyContent:'flex-end', marginTop:10}}>
                <TouchableOpacity onPress={() => this.resetScore()} style={styles.modalButtons}>
                  <Text style={{color: 'white'}}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ isScoreModalVisible: false })} style={styles.modalButtons}>
                  <Text style={{color: 'white'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex:2}}>

            </View>

          </View>
        </Modal>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scorebar: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  scoreText: {
    fontSize: 35,
    color: 'white'
  },
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#3DDBA4',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#3DDBA4',
    height: 100,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop:0,
    marginBottom:0,
    alignItems: 'flex-start'
  },
  modalButtons: {
    backgroundColor: '#00AF89',
    borderRadius:5,
    paddingTop:3,
    paddingBottom:3,
    paddingLeft:6,
    paddingRight:6,
    margin: 4
  }
});
