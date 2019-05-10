function F1(props){
    return(
    <div>
        <form>
        Name: <input type='text' id='name-text'/><br/>
        Email: <input type='text' id='email-text' /><br/>
        Password: <input type='text' id='pass-text' /><br/>
        </form>
    </div>)
}

function F2(props){
    return(
        <div>
            Shipping Address<br/>
            Street Address 1: <input type='text' id='address-1'/><br/>
            Street Address 2: <input type='text' id='address-2' /><br/>
            City: <input type='text' id='city' /><br/>
            State: <input type='text' id='state' /><br/>
            Zip-Code: <input type='text' id='zip-code' /><br/>
            Phone: <input type='text' id='city' /><br/>
        </div>
    );
}

function F3(props){
    return(
        <div>
            Credit Card<br/>
            CC# : <input type='text' id='cc-num' /><br/>
            Expiry: <input type='text' id='expiry' /><br/>
            CVV: <input type='text' id='cvv' /><br/>
            Billing Zip: <input type='text' id='billing-zip' /><br/>
        </div>
    )
}

function Index(props){
    return(<div>Index</div>)
}

class Main extends React.Component{
    constructor(props){
        super(props);

        this.state = {
        currentPage : <Index />,
        currentPageChecker : "Index",
        buttonName : "Checkout"
        };
        this.pageClick = this.pageClick.bind(this);
    }

    pageClick(){
        console.log("TEST!");
        if(this.state.currentPageChecker === "Index"){
            this.setState({ buttonName : "Next", currentPage : <F1 />, currentPageChecker : "F1"});
        }else if(this.state.currentPageChecker === "F1"){
            this.setState({currentPage: <F2 />, currentPageChecker : "F2"});
        }else if(this.state.currentPageChecker === "F2"){
            this.setState({ buttonName : 'Purchase', currentPage: <F3 />, currentPageChecker : "F3"});
        }else if(this.state.currentPageChecker  === "F3"){
            this.setState({ buttonName: 'Checkout', currentPage : <Index />, currentPageChecker : "Index"});
        }
    }

    render(){
        return (
        <div>
            <div> {this.state.currentPage} </div>
            <div><br/><button onClick={this.pageClick}>{this.state.buttonName}</button></div>
        </div>
        )
    }
}



ReactDOM.render(<Main />, document.getElementById('root'));