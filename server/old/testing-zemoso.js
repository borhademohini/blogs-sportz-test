let user = {
    name: "Mohini",
    age: function (age) {
        return "Age of " + this.name + " is " + age;

    }
}

let obj1 = new user('Mohini');
obj1.age(10);

let obj2 = new user('Abhishek');
obj1.age(20);

//jq("input.test").length;

//jq("input[type='text'].test").length;

const testComponent = (props) => {

    const [a, setA] = useState(1);
    const [b, setB] = useState(2);

    const [stateData, setStateData] = useState({a: 1, b: 2, error: ''})
    const rememberValue = useMemo(() => {
        // Some formatting
        let c = a + b;
        return c;
    },[a, b]);
    

    const fetchAPIData = async () => {
        try {
            let data = await Dataservice.get("http://mohini/v1");
    
        } catch(e) {
            setStateData({...stateData, error: "Error thrown from API"});
    
        }

    }

    // useEffect(()=> {
    //     alert();
    // }, [stateData.error]);

    useEffect(()=> {
        fetchAPIData();
    }, []);

    return (<div>
        { rememberValue }

        {stateData.error && <div>Error testComponent</div> }

    </div>)
}


jq(".input").debouncing(function() {

})

// .input {
//     background: "#fff !important" ;
// }

