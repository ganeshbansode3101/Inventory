import React, { useEffect, useState } from 'react'
import "./Inventory.css"
import axios from 'axios'

const Inventory = () => {
    const [data, setdata] = useState([])
    const [dataCuntry, setdataCuntry] = useState([])
    const [datastate, setdatastate] = useState([])
    const [selectcountry, setselectcountry] = useState(null)
    const [selectstate, setselectstate] = useState("")
    const [selectcity, setselectcity] = useState([])

    const [check1, setcheck1] = useState(true)
    const [check2, setcheck2] = useState(false)
    const [selectdate, setselectdate] = useState("")
    const [email, setemail] = useState("")
    const [error, seterror] = useState("")
    const [itemname, setitemname] = useState("")
    const [unitprice, setunitprice] = useState("")
    const [Numberinput, setNumberinput] = useState("")
    const [phoneNumberinput, setphoneNumberinput] = useState("")

    const [Suppliername, setSuppliername] = useState("")
    const [Cityname, setCityname] = useState("")
    const [Companyname, setCompanyname] = useState("")





    const handlsubmit = async () => {
        try {
            const payload = {

                "itemDetails": {
                    "itemName": itemname,
                    "quantity": Numberinput,
                    "unitPrice": unitprice,
                    "currency": selectcountry?.currency,
                    "submissionDate": selectdate.replace(/\//g, "")
                },
                "supplier": {
                    "supplierName": Suppliername,
                    "companyName": Companyname,
                    "email": email,
                    "phoneCode": selectcountry?.phonecode,
                    "phoneNumber": Numberinput,
                    "countryId": selectcountry?.countryId,
                    "stateId": selectstate,
                    "cityId": Cityname,
                }


            }
            const resp = await axios.post("https://apis-technical-test.conqt.com/Api/Item-Supplier/Save-Items-Suppliers", payload)

            console.log("submited data",resp);
        } catch (error) {
            console.log("error");
            alert("Somthing Wrong")

        }
    }




    const [loading, setloading] = useState(true)

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const resp = await axios.get("https://apis-technical-test.conqt.com/Api/Item-Supplier/Get-All-Items")
                setdata(resp.data.data.items)
                setloading(false)
                console.log("respallitem", resp);

            } catch (error) {
                console.log(error);
                setloading(true)

            }

        }
        fetchdata();

    }, [])


    useEffect(() => {
        const GetcountyList = async () => {
            try {
                const resp = await axios.get("https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CountryList")
                setdataCuntry(resp?.data?.data?.countyList)
                console.log("resp", resp.data.data?.countyList);

            } catch (error) {
                console.log(error);

            }

        }
        GetcountyList();

    }, [])


    useEffect(() => {
        const GetStateList = async () => {
            try {

                const resp = await axios.get("https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-SateList-By-Country?countryId=%3CcountryId", { params: { countryId: selectcountry?.countryId } })
                setdatastate(resp?.data?.data?.stateList)
                console.log("respstate", resp);

            } catch (error) {
                console.log(error);

            }

        }
        GetStateList();

    }, [selectcountry])



    useEffect(() => {
        const GetcityList = async () => {
            try {

                const resp = await axios.get(" https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CityList-By-Country-State?countryId=%3CcouontryId%3E&stateId=%3CstateId", { params: { countryId: selectcountry?.countryId, stateId: selectstate } })
                setselectcity(resp?.data?.data?.cityList)
                console.log("cityresp", resp);
                

            } catch (error) {
                console.log(error);

            }

        }
        GetcityList();

    }, [selectstate])





    const handleinput = (e) => {
        const value = e.target.value;
        if (value?.length <= 10 && /^\d*$/.test(value)) {
            setNumberinput(value)
        }
    }
    const handleinputphone = (e) => {
        const value = e.target.value;
        if (value?.length <= 10 && /^\d*$/.test(value)) {
            setphoneNumberinput(value)
        }
    }




    const today = new Date()
    const formattoday = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`

    const handladate = (event) => {
        const inputdate = new Date(event.target.value)
        const formatteddate = `${inputdate.getMonth() + 1}/${inputdate.getDate()}/${inputdate.getFullYear()}`
        setselectdate(formatteddate)
    }


    const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    function emailformvalidate(email) {
        return emailregex.test(email)
    }



    function handlemail(e) {
        const enteremail = e.target.value;
        setemail(enteremail);
        if (!emailformvalidate(enteremail)) {
            seterror("Invalid Email Address")

        }
        else {
            seterror("")
        }
    }


    const handlslectedchange = (e) => {
        const sid = e.target.value
        const item = dataCuntry.find((d) => d.countryId === parseInt(sid))
        console.log("item", item);
        setselectcountry(item)
    }




    return (
        <div className="container">
            <div className='nav'>
                <h2 className="header">
                    Inventory Management System
                </h2>

                <h3 className='home'>Home</h3>

            </div>

            <div className='check'>
                <input checked={check1} onChange={(() => setcheck1(!check1))} type="checkbox" />Item
                <input onChange={(() => setcheck2(!check2))} type="checkbox" />Supplier
            </div>




            {
                check1 && (
                    <div>
                        <div className='ItemDetails'>
                            <h1 >
                                Item Details
                            </h1>
                        </div>


                        <form>
                            <div className='Item_Container'>

                                <div className='First_Row_Input'>

                                    <div >
                                        <h4>Item Name <br /> <input onChange={((e) => setitemname(e.target.value))} className='input' maxLength={50} type="text" placeholder='Item Name' />
                                        </h4>
                                        <p>Max 50 characters</p>
                                    </div>




                                    <div>
                                        <h4>Unit Price  <br /><input onChange={((e) => setunitprice(e.target.value))} className='input' type="number" placeholder='Enter Unit Price' maxLength={10} /></h4>
                                        <p>Numeric value (USD)</p>

                                    </div>



                                </div>




                                <div className='Second_Row_Input'>

                                    <div>

                                        <h4>Quantity <br /><input value={Numberinput} onChange={handleinput} type="number" className='input' placeholder='Enter Quantity' /></h4>
                                        <p>Numeric Value</p>
                                    </div>

                                    <div>

                                        <h4>Date of Submission <br /><input min={today.toISOString().split("T")[0]} onChange={handladate} type="date" className='input' placeholder='Select Date' /></h4>
                                        <p>Format: MM/DD/YYYY</p>
                                    </div>

                                </div>



                            </div>







                        </form>
                    </div>
                )
            }







            {/* second form */}

            {check2 ? <>

            </> : null}


            {
                check2 && (
                    <div>
                        <div className='ItemDetails'>
                            <h1 >
                                Supplier Details
                            </h1>
                        </div>
                        <form>

                            <div className='Item_Container'>

                                <div className='First_Row_Input'>

                                    <div >
                                        <h4>Supplier Name <br /> <input onChange={((e) => setSuppliername(e.target.value))} className='input' maxLength={50} type="text" placeholder='Item Name' />
                                        </h4>
                                        <p>Max 50 characters</p>
                                    </div>

                                    <div>
                                        <select onChange={handlslectedchange} className='select' name="" id="">
                                            <option value="">Select Country</option>
                                            {dataCuntry?.map((options) => (
                                                <option key={options.countryId} value={options.countryId} >
                                                    {options.name}
                                                </option>

                                            ))}
                                        </select>
                                        <p>Select country from the List</p>

                                    </div>

                                    <div>
                                        <select onChange={((e) =>
                                            setCityname(e.target.value))} className='select' name="" id="">
                                            <option value="">Select City</option>
                                            {selectcity?.map((options) => (
                                                <option key={options.cityId} value={options.cityId}>
                                                    {options.name}
                                                </option>

                                            ))}
                                        </select>
                                        <p>Max 50 characters</p>


                                    </div>
                                    <div>
                                        <h4>Email Address  <br /><input onChange={handlemail} value={email} required className='input' type="text" placeholder='Enter Email Address' /></h4>
                                        {error && <p style={{ color: "red" }}>Valid Email Format</p>}

                                    </div>




                                </div>




                                <div className='Second_Row_Input'>

                                    <div>

                                        <h4>Company Name <br /><input onChange={((e) => setCompanyname(e.target.value))} type="text" className='input' placeholder='Enter Company Name' /></h4>
                                        <p>Max 50 characters</p>

                                    </div>

                                    <div>


                                        <select onChange={((e) =>
                                            setselectstate(e.target.value))} className='select' name="" id="">
                                            <option value="">Select State</option>
                                            {datastate?.map((options) => (
                                                <option key={options.stateId} value={options.stateId}>
                                                    {options.name}
                                                </option>

                                            ))}
                                        </select>
                                        <p>Select State from the List</p>

                                    </div>

                                    <div>

                                        <h4>Phone Number  <br /><input value={phoneNumberinput} onChange={handleinputphone} className='input' type="number" placeholder="Enter Phone Number" /></h4>
                                        <p>Phone Number</p>
                                        {/* phonecode */}
                                    </div>

                                </div>



                            </div>
                        </form>
                    </div >
                )
            }


            <div className='submit_Sec'>
                <h1>Submitted Data</h1>
                <p>The data submitted by User   Will Be displayed below</p>
                <button onClick={handlsubmit} className='btn1' >Save Changes</button>



            </div>

            <div className='submit_Sec'>

                <table border="1" style={{ borderCollapse: "collapse", marginTop: "10px", boxShadow: "0px 1px 6px #101828", borderRadius: "6px" }}>
                    <thead>
                        <div className='tablebtn'>

                            <h3>Uploaded Data</h3>
                        </div>
                        <tr style={{ backgroundColor: "whitesmoke", boxShadow: "0px 1px 2px #101828" }}>
                            <th> <input type="checkbox" />Supplier</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>City,Country</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr style={{ backgroundColor: index % 2 ? "silver" : "", height: "50px" }} key={item?.itemId}>
                                <td><input type="checkbox" />{item?.Supplier?.supplierName}</td>
                                <td>{item?.itemName}</td>
                                <td>{item?.quantity}</td>
                                <td>{item?.unitPrice}</td>
                                <td>{item?.Supplier?.cityName}</td>
                                <td>{item?.Supplier?.email}</td>
                                <td>{item?.Supplier?.phoneNumber}</td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>


        </div >
    )
}

export default Inventory