import { useState } from "react";
import "./App.css"

const segmentNameStyle={
  width:"400px",
  height:"40px",
  marginTop:"20px"
}

const handleAddSchemaStyle={
  border:"none",
  backgroundColor:"white",
  marginBottom:"100px",
  color:"#1C9392",
  borderRadius:"2px"
}

const addsegmaStyle={
  width:"400px",
  height:"40px",
  marginTop:"20px"
}

const SegmentnameStyle={
  border:"none",
  backgroundColor:"white",
  color:"#1C9392",
  borderRadius:"2px"
}
const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function SegmentForm() {
  const [currentScema, setCurrentSchema] = useState("");
  const [schemaTodo, setSchemaTodo] = useState([]);
  const [segmentName, setSegmentName] = useState("");

  function handleSchemaChange(e){
    setCurrentSchema(e.target.value);
  }
  
  function handleAddSchema(){
    setSchemaTodo([...schemaTodo, currentScema]);
    // setCurrentSchema("");
  }

  function handleTodoSchemaChange(e, idx){
    let newSchemaTodo = [...schemaTodo];
    newSchemaTodo[idx] = e.target.value;
    setSchemaTodo(newSchemaTodo);
  }

  function handleSaveSegment(){
    let obj = {
      segment_name: segmentName,
      schema :[]
    };

    for(let i=0; i<schemaTodo.length; i++){
      obj.schema.push({[schemaTodo[i]]:schemaTodo[i]});
    }
    fetch('https://webhook.site/fd593433-3d6b-4671-9052-50390d0d360a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
      console.log(obj)
  }

 

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>

        <div>
            {/* input */}
            <h1 style={{backgroundColor:"#1C9392",color:"white",fontSize:"30px",height:"50px",textAlign:"center"}}> Saving Segment </h1>
            <div>
                <input type="text" placeholder="Segment Name" onChange={(e)=>setSegmentName(e.target.value)} style={segmentNameStyle}/>
            </div>
            <div>
                <p>To save your segment, you need to add the schemas to build the query</p>
                <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
                    <div>User Traits</div>
                    <div>Group Traits</div>  
                </div>  
            </div>
            {/* schemaTodo */}
            <div style={{ display: "flex", flexDirection: "column" ,border:schemaTodo.length!==0 && "2px solid #1C9392"}}>
                {schemaTodo.map( (sch, idx) => (
                <select style={addsegmaStyle}
                onChange={(e) => handleTodoSchemaChange(e, idx)}
                key={idx + idx} 
                >
                    {schemaOptions.filter(el=>el.value===schemaTodo[idx]).map( (ele) => (
                        <option value={ele.value} key={ele.value}>
                            {ele.label}
                        </option>
                    ))}
                    {schemaOptions.filter(el=>!schemaTodo.includes(el.value)).map( (ele) => (
                        <option value={ele.value} key={ele.value}>
                           {ele.label}
                        </option>
                    ))}
                </select>
                ))}
            </div>

           
            
            <div>
                <select onChange={handleSchemaChange} style={addsegmaStyle}>
                    <option value="none" selected disabled hidden>
                        Select an Option
                    </option>
                    {schemaOptions.filter(el=>!schemaTodo.includes(el.value)).map((ele) => (
                        <option value={ele.value} key={ele.value}>
                        {ele.label}
                        </option>
                    ))}
                </select>
                <button onClick={handleAddSchema} style={handleAddSchemaStyle} className="add-segma-btn">+ Add Schema</button>
            </div>
            <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>

                <button onClick={handleSaveSegment} className="save-segment-btn" style={{border:"none",backgroundColor:"#1C9392",color:"white",width:"130px",height:"40px",borderRadius:"5px"}}>
                    Save Scema
                </button>
                <button className="cancel-segment-btn" style={{border:"none",backgroundColor:"white",color:"red",width:"130px",height:"40px",borderRadius:"5px"}}>
                    Cancel
                </button>
            </div>
        </div>
    </div>
  );
}

export default SegmentForm