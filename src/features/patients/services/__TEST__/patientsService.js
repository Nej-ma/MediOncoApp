const recentPatients = [
    {
        id: '200600701',
        firstName: 'Carol',
        lastName: 'Danvers',
        birth_name: 'Danvers',
        birth_date: '1984-07-08',
        ins: '12345678901',
        room: '101',
        service: 'Consultation'
    },
    {
        id: '200600702',
        firstName: 'Vanessa',
        lastName: 'Fisk',
        birth_name: 'Fisk',
        birth_date: '1975-05-12',
        ins: '12345678902',
        room: '102',
        service: 'Chimio'
    },
    {
        id: '200600703',
        firstName: 'Peter',
        lastName: 'Parker',
        birth_name: 'Parker',
        birth_date: '1990-08-10',
        ins: '12345678903',
        room: '103',
        service: 'Radiothérapie'
    },
    {
        id: '200600704',
        firstName: 'Matt',
        lastName: 'Murdock',
        birth_name: 'Murdock',
        birth_date: '1982-04-15',
        ins: '12345678904',
        room: '104',
        service: 'Consultation'
    },
    {
        id: '200600705',
        firstName: 'Kate',
        lastName: 'Bishop',
        birth_name: 'Bishop',
        birth_date: '1995-06-09',
        ins: '12345678905',
        room: '105',
        service: 'Chimio'
    },
    {
        id: '200600706',
        firstName: 'Jessica',
        lastName: 'Jones',
        birth_name: 'Jones',
        birth_date: '1987-12-03',
        ins: '12345678906',
        room: '106',
        service: 'Radiothérapie'
    },
    {
        id: '200600707',
        firstName: 'Luke',
        lastName: 'Cage',
        birth_name: 'Cage',
        birth_date: '1981-09-22',
        ins: '12345678907',
        room: '107',
        service: 'Consultation'
    },
    {
        id: '200600708',
        firstName: 'Wade',
        lastName: 'Wilson',
        birth_name: 'Wilson',
        birth_date: '1978-02-18',
        ins: '12345678908',
        room: '108',
        service: 'Chimio'
    },
    {
        id: '200600709',
        firstName: 'Bruce',
        lastName: 'Banner',
        birth_name: 'Banner',
        birth_date: '1979-11-27',
        ins: '12345678909',
        room: '109',
        service: 'Radiothérapie'
    },
    {
        id: '200600710',
        firstName: 'Natasha',
        lastName: 'Romanoff',
        birth_name: 'Romanoff',
        birth_date: '1984-03-15',
        ins: '12345678910',
        room: '110',
        service: 'Consultation'
    },
    {
        id: '200600711',
        firstName: 'Tony',
        lastName: 'Stark',
        birth_name: 'Stark',
        birth_date: '1976-05-29',
        ins: '12345678911',
        room: '111',
        service: 'Chimio'
    },
    {
        id: '200600712',
        firstName: 'Stephen',
        lastName: 'Strange',
        birth_name: 'Strange',
        birth_date: '1982-09-11',
        ins: '12345678912',
        room: '112',
        service: 'Radiothérapie'
    },
    {
        id: '200600713',
        firstName: 'Peter',
        lastName: 'Quill',
        birth_name: 'Quill',
        birth_date: '1980-07-13',
        ins: '12345678913',
        room: '113',
        service: 'Consultation'
    },
    {
        id: '200600714',
        firstName: 'Scott',
        lastName: 'Lang',
        birth_name: 'Lang',
        birth_date: '1985-10-21',
        ins: '12345678914',
        room: '114',
        service: 'Chimio'
    },
    {
        id: '200600715',
        firstName: 'Clint',
        lastName: 'Barton',
        birth_name: 'Barton',
        birth_date: '1983-01-01',
        ins: '12345678915',
        room: '115',
        service: 'Radiothérapie'
    },
    {
        id: '200600716',
        firstName: 'Yelena',
        lastName: 'Belova',
        birth_name: 'Belova',
        birth_date: '1988-04-30',
        ins: '12345678916',
        room: '116',
        service: 'Consultation'
    },
    {
        id: '200600717',
        firstName: 'Laura',
        lastName: 'Barton',
        birth_name: 'Mockingbird',
        birth_date: '1985-03-17',
        ins: '12345678917',
        room: '117',
        service: 'Chimio'
    }

]; 
    

export const getRecentPatients = () => {
    return recentPatients;
};

export const getPatientByid = (patientid) => {
    return recentPatients.find((patient) => patient.id === patientid);
}

export const getPatientByName = (patientName) => {
    return recentPatients.find((patient) => patient.firstName === patientName);
}

export const getPatientByLastName = (patientLastName) => {
    return recentPatients.find((patient) => patient.lastName === patientLastName);
}

export const getPatientByFullName = (patientFullName) => {
    return recentPatients.find((patient) => patient.fullName === patientFullName);
}

export const getPatientByFirstAndLastName = (patientFirstName, patientLastName) => {
    return recentPatients.find((patient) => patient.firstName === patientFirstName && patient.lastName === patientLastName);
}

export const searchPatient = (searchCriteria) => {
    return recentPatients.filter(patient => {
      return (
        (searchCriteria.id ? patient.id.includes(searchCriteria.id) : true) &&
        (searchCriteria.firstName ? patient.firstName.toLowerCase().includes(searchCriteria.firstName.toLowerCase()) : true) &&
        (searchCriteria.lastName ? patient.lastName.toLowerCase().includes(searchCriteria.lastName.toLowerCase()) : true) &&
        (searchCriteria.birthDate ? patient.birth_date === searchCriteria.birthDate : true)
      );
    });
  };
  