function authenticateUser() {
    const token = localStorage.getItem( "token" );
    if ( !token ) {
        window.location.href = "index.html";
        return;
    }

    return token;
}

const token = authenticateUser()

try {

    let getRecords = fetch("http://localhost:8010/api/students", {
        method: "GET",
        headers: {
            authorization: `Bearer ${ token }`
        }
    });

    getRecords.then( response => response.json() )
    .then( data => {
        let records = data["Records"];

        let tableBody = document.getElementById( "tableBody" );
        
        let tableRow = ``;
        records.forEach(record => {
            tableRow += `<tr>
                    <td scope="row">
                        <div class="profile-pic">
                            <img 
                                src=${ (record.studentImage)? `http://localhost:8010/api/students/${record.studentImage}` : "" }
                                class="profile-pic-image"
                            />
                        </div>
                    </td>
                    <td scope="row">${ record.studentName }</td>
                    <td scope="row">${ record.studentEmail }</td>
                    <td scope="row">${ record.studentPhone }</td>
                    <td scope="row">${ record.studentAge }</td>
                    <td scope="row">${ record.studentGender }</td>
                    <td scope="row">${ record.studentCourse }</td>
                    <td scope="row">
                        <button 
                            class='btn btn-primary' 
                            onclick='viewRecord("${record._id}")'
                            data-bs-toggle="modal" 
                            data-bs-target="#viewModel">
                            View
                        </button>
                        <button 
                            class='btn btn-warning' 
                            onclick='updateRecord("${record._id}")'
                            data-bs-toggle="modal" 
                            data-bs-target="#updateModal"
                        >
                            Update
                        </button>
                        <button class='btn btn-danger' onclick='deleteRecord("${record._id}")'>Delete</button>
                    </td>
                </tr>`
        });
        
        // console.log( record._id );
        tableBody.innerHTML = tableRow;
    } );

} catch ( err ) {
    console.log( err );
}

const addRecordForm = document.getElementById( "addRecordForm" );
addRecordForm.addEventListener( "submit", async (e) => {
    e.preventDefault();

    const formData = new FormData( addRecordForm );

    const imageFile = formData.get( "studentImage" );
    const studentRecord = {
        studentName: formData.get( "studentName" ),
        studentEmail: formData.get( "studentEmail" ),
        studentPhone: formData.get( "studentPhone" ),
        studentAge: Number( formData.get( "studentAge" ) ),
        studentGender: formData.get( "studentGender" ),
        studentCourse: formData.get( "studentCourse" ),
        studentImage: imageFile
    };

    try {


        const response = await fetch( "http://localhost:8010/api/students", {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            },
            body: formData
        } );

        const data = await response.json();
        console.log( data );
        window.location.reload();


    } catch ( err ) {
        console.log( err );
    }

} )

const viewRecord = async ( studentId ) => {
    
    try {

        console.log( studentId );
        const response = await fetch( 
            `http://localhost:8010/api/students/${ studentId }`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${ token }`
                }
            }
        );

        const data = await response.json();

        const viewStudentRecord = document.getElementById( "viewStudentRecord" );
        viewStudentRecord.innerHTML = 
        `<div style="width: 250px; height: 250px; margin-bottom: 30px; overflow: hidden; border: 5px solid #000; border-radius: 50%;">
                <img 
                    src = ${ (data['Records'].studentImage)? `http://localhost:8010/api/students/${data["Records"].studentImage}` : "" }
                    style="width: 100%; height: 100%; object-fit: cover;"
                />
            </div>

            <div class="d-flex">
                <h4 class='text-light'>Student Name: ${ data['Records'].studentName }</h4>
            </div>

            <div class="d-flex">
                <h4 class='text-light'>Student Email: ${ data['Records'].studentEmail }</h4>
                <span></span>
            </div>

            <div class="d-flex">
                <h4 class='text-light'>Student Phone: ${ data["Records"].studentPhone }</h4>
                <h3></h3>
            </div>

            <div class="d-flex">
                <h4 class='text-light'>Student Age: ${ data["Records"].studentAge }</h4>
            </div>

            <div class="d-flex">
                <h4 class='text-light'>Student Gender: ${ data["Records"].studentGender }</h4>
            </div>

            <div class="d-flex">
                <h4 class='text-light'>Student Course: ${ data["Records"].studentCourse }</h4>
        </div>`

    } catch ( err ) {
        console.log( err );
    }

}

const updateRecord = async ( studentId ) => {
    
    try {

        const response = 
        await fetch( 
            `http://localhost:8010/api/students/${ studentId }`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${ token }`
                }
            }
        );

        const individualStudentData = await response.json();



        const formElem = document.getElementById("updateRecordForm");

        formElem.dataset.studentId = 
        individualStudentData["Records"]._id;


        formElem.innerHTML = 
        `<div class="modal-body" id="updateStudentRecord">
                        <div class="row mb-4">
                            <div class="col">
                                <label class="mb-2">Name: </label>
                                <input type="text" 
                                    class="form-control"
                                    placeholder="Name" 
                                    aria-label="name"
                                    name="studentName"
                                    value="${ individualStudentData["Records"].studentName }"
                                    required="required">
                            </div>
                            <div class="col">
                                <label class="mb-2">Email: </label>
                                <input type="email" 
                                    class="form-control" 
                                    placeholder="Email" 
                                    aria-label="email"
                                    name="studentEmail"
                                    value="${ individualStudentData["Records"].studentEmail }"
                                    required="required"
                                    >
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col">
                                <label class="mb-2">Phone: </label>

                                <input type="tel" 
                                    class="form-control"
                                    placeholder="phone" 
                                    aria-label="phone"
                                    name="studentPhone"
                                    value="${ individualStudentData["Records"].studentPhone }"
                                    required="required">
                            </div>
                            <div class="col">
                                <label class="mb-2">Age: </label>

                                <input type="number" 
                                    class="form-control" 
                                    placeholder="Age" 
                                    aria-label="age"
                                    name="studentAge"
                                    value="${ individualStudentData["Records"].studentAge }"
                                    required="required">
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col">
                                <label class="mb-2">Course: </label>

                                <input type="text" 
                                    class="form-control" 
                                    placeholder="Course" 
                                    aria-label="course"
                                    name="studentCourse"
                                    value="${ individualStudentData["Records"].studentCourse }"
                                    required="required">
                            </div>
                            <div class="col">
                                <label class="mb-2">Change Image: </label>
                                <input type="file" 
                                    class="form-control"
                                    placeholder="Gender" 
                                    aria-label="gender"
                                    name="studentImage">
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col">
                            <label>Gender: </label>
                            <div class="me-4">
                                    <input type="radio" 
                                        class="me-2"
                                        placeholder="Gender" 
                                        aria-label="gender"
                                        value="Male"
                                        name="studentGender"
                                        ${ (individualStudentData["Records"].studentGender == "Male")? "checked" : "" }
                                        id="genderMale"><label for="genderMale"> Male</label>
                                </div>

                                <div class="me-4">
                                    <input type="radio" 
                                        class="me-2"
                                        placeholder="Gender" 
                                        aria-label="gender"
                                        value="Female"
                                        id="genderFemale"
                                        ${ (individualStudentData["Records"].studentGender == "Female")? "checked" : "" }
                                        name="studentGender"><label for="genderFemale"> Female</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" 
                        class="btn btn-primary">
                        Update</button>
                    </div>
        </div>`

    } catch ( err ) {
        console.log( err );
    }

}

const updateRecordForm = document.getElementById( "updateRecordForm" );
updateRecordForm.addEventListener( 
    "submit", 
    async ( e ) => {
        e.preventDefault();

        try {

            const studentId = updateRecordForm.dataset.studentId;

            const formData = new FormData( updateRecordForm );

            const response = await fetch(
                `http://localhost:8010/api/students/${ studentId }`,
                {
                    method: "PUT",
                    headers: {
                        authorization: `Bearer ${ token }`
                    },
                    body: formData
                }
            );

            const output = await response.json();

            console.log( output );

            window.location.reload()


        } catch ( err ) {
            console.log( err );
        }

    }
)

const deleteRecord = async ( studentId ) => {
    try {

        const response = await fetch(
            `http://localhost:8010/api/students/${ studentId }`,
            {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${ token }`
                }
            }
        );

        let json = await response.json();

        console.log( json );

        window.location.reload();

    } catch ( err ) {
        console.log( err );
    }
}