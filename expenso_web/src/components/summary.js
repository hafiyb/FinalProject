import { faCogs } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import SummaryLine from "./summaryLine"
import SummaryPieEarnings from "./summaryPieEarnings"
import SummaryPieSpendings from "./summaryPieSpendings"
import SummaryTotal from "./summaryTotal"

const comps = [<SummaryTotal />,<SummaryPieSpendings />,<SummaryPieEarnings />]

const Summary = () =>{

    const [showSetting, setshowSetting] = useState(false)

    const [sumTotal, setsummaryTotal] = useState(true)
    const [sumPieEarnings, setsummaryPieEarnings] = useState(false)
    const [sumPieSpendings, setsummaryPieSpendings] = useState(false)

    return(
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <div style={styles.header}>
                    <h2>Summary</h2>
                    <div style={{cursor:'pointer'}} onClick={() => setshowSetting(!showSetting)}><FontAwesomeIcon icon= {faCogs}/></div>
                </div>
                {showSetting
                ? <div style={styles.setting}>
                    {/* <input type="checkbox" onClick={() => setsummaryTotal(!sumTotal)} value={sumTotal}/> */}
                    {sumTotal
                    ?<button style={styles.buttonSH} type="button" onClick={() => setsummaryTotal(!sumTotal)} >Hide Total</button>
                    :<button style={styles.buttonSH} type="button" onClick={() => setsummaryTotal(!sumTotal)} >Show Total</button>
                    }
                    {sumPieEarnings
                    ?<button style={styles.buttonSH} type="button" onClick={() => setsummaryPieEarnings(!sumPieEarnings)} >Hide Earnings</button>
                    :<button style={styles.buttonSH} type="button" onClick={() => setsummaryPieEarnings(!sumPieEarnings)} >Show Earnings</button>
                    }
                    {sumPieSpendings
                    ?<button style={styles.buttonSH} type="button" onClick={() => setsummaryPieSpendings(!sumPieSpendings)} >Hide Spendings</button>
                    :<button style={styles.buttonSH} type="button" onClick={() => setsummaryPieSpendings(!sumPieSpendings)} >Show Spendings</button>
                    }
                    {/* <button type="button" onClick={() => setsummaryTotal(!sumTotal)} >Test</button> */}
                </div>
                : null
                }
                <div style={{padding:2, overflow:'auto', height:'90%'}}>
                
                {/* <SummaryLine /> */}
                    {/* {comps.map((here) => here)} */}
                    {sumTotal
                    ?<SummaryTotal />
                    :null
                    }
                    {sumPieEarnings
                    ?<SummaryPieEarnings />
                    :null
                    }
                     {sumPieSpendings
                    ?<SummaryPieSpendings />
                    :null
                    }
                    {/* <SummaryPieEarnings />
                    <SummaryPieSpendings /> */}
                </div>
            </div>
        </div>
    )
}

export default Summary

const styles = {
    container:{
        minWidth:400,
        width:'25%',
        height:'100vh',
        // backgroundColor:'black',
        paddingLeft:2,
        paddingRight:2,

    },
    innerContainer:{
        width:'100%',
        height:'100%',
        // backgroundColor:'white',
        // overflow:'scroll'
    },
    innerContainer2:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        overflow:'scroll'
        // padding:5
    },
    header:{
        backgroundColor:'#ffd700',
        width:'100%',
        height:65,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:20,
        paddingRight:30,
        borderBottomRightRadius:30,
        borderBottomWidth:5,
        borderColor:'black'
        // borderBottomLeftRadius:20,
    },
    setting:{
        // backgroundColor:'green',
        width:'100%',
        height:100,
        display:'flex',
        flexDirection:'column',
        overflow:'scroll'
    },
    buttonSH:{
        padding:5,
        borderRadius:15,
        backgroundColor:'black',
        color:'#ffd700',
        fontWeight:'bold',
        cursor:'pointer'
    }
}