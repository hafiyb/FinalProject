const Summary = () =>{
    return(
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <div style={styles.header}>
                    <h2>Summary</h2>
                </div>
            </div>
        </div>
    )
}

export default Summary

const styles = {
    container:{
        minWidth:400,
        width:'40%',
        height:'100vh',
        backgroundColor:'black',
        paddingLeft:2,
        paddingRight:2
    },
    innerContainer:{
        width:'100%',
        height:'100%',
        backgroundColor:'white'
    },
    header:{
        backgroundColor:'#ffd700',
        width:'100%',
        height:65,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:20,
        paddingRight:30,
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,
    }
}