// FilterPanel.js
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AgendaLibellePicker from './AgendaLibellePicker';

const FilterPanel = ({ onFilterChange }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mainLibelle, setMainLibelle] = useState('');
  const [sousLibelle, setSousLibelle] = useState('');
  const [isTimeFilterVisible, setTimeFilterVisible] = useState(false);
  const [timeSlots, setTimeSlots] = useState([
    { start: '08:00', end: '12:00', label: 'Matin', selected: false },
    { start: '12:00', end: '16:00', label: 'Après-midi', selected: false },
    { start: '16:00', end: '20:00', label: 'Soir', selected: false },
  ]);
  const [customTimeSlots, setCustomTimeSlots] = useState([]);
  const [customTimeSlot, setCustomTimeSlot] = useState({ start: null, end: null });
  const [timeSlotToSet, setTimeSlotToSet] = useState(null);
  const [isFilterPanelOpen, setFilterPanelOpen] = useState(false);
  const panelHeight = useRef(new Animated.Value(0)).current;
  // Ensure formatDateForAPI is defined within the component before its first use.
const formatDateForAPI = (date) => {
    // Check if 'date' is a Date object and is valid
    if (date instanceof Date && !isNaN(date.valueOf())) {
        // Format the date as YYYY/MM/DD
        return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
    } else {
        console.error("Attempting to format an invalid date:", date);
        return ''; // Return an empty string or a default value as a fallback
    }
};
  const [selectedDateString, setSelectedDateString] = useState(formatDateForAPI(new Date()));

  const handleLibelleSelected = (mainLibelleSelected, sousLibelleSelected) => {
    setMainLibelle(mainLibelleSelected);
    setSousLibelle(sousLibelleSelected);
    console.log('mainLibelleSelected', mainLibelleSelected);
    console.log('sousLibelleSelected', sousLibelleSelected);
  };

  
  const showTimePicker = (slotKey) => {
    setTimeSlotToSet(slotKey);
    setTimePickerVisibility(true); 
  };

    // Function to handle the confirmation of custom time slot selection
    const onConfirmCustomTime = (date) => {
      const timeString = date.toTimeString().substr(0, 5);
      const updatedSlot = { ...customTimeSlot, [timeSlotToSet]: timeString };
      setCustomTimeSlot(updatedSlot);
  
      // Prevent automatic fetching by not calling onFilterChange here
      setTimePickerVisibility(false);
    };
 
    const addCustomTimeSlot = () => {
      if (customTimeSlot.start && customTimeSlot.end) {
        const newCustomSlot = { ...customTimeSlot, label: 'Custom', selected: true };
        const updatedCustomSlots = [...customTimeSlots, newCustomSlot];
        setCustomTimeSlots(updatedCustomSlots);
        setCustomTimeSlot({ start: null, end: null });
  
        // Prevent automatic fetching by not calling onFilterChange here
      }
    };

   // Function to toggle time slot selection
  const toggleTimeSlotSelection = (index, isCustom = false) => {
    if (isCustom) {
      const updatedCustomSlots = customTimeSlots.map((slot, i) =>
        i === index ? { ...slot, selected: !slot.selected } : slot);
      setCustomTimeSlots(updatedCustomSlots);
    } else {
      const updatedTimeSlots = timeSlots.map((slot, i) =>
        i === index ? { ...slot, selected: !slot.selected } : slot);
      setTimeSlots(updatedTimeSlots);
    }
    // Prevent automatic fetching by not calling onFilterChange here
  };

    // Function to remove a custom time slot
    const removeCustomTimeSlot = (index) => {
      const updatedCustomSlots = customTimeSlots.filter((_, i) => i !== index);
      setCustomTimeSlots(updatedCustomSlots);
      // Prevent automatic fetching by not calling onFilterChange here
    };

    const toggleFilterPanel = () => {
      const newValue = !isFilterPanelOpen;
      setFilterPanelOpen(newValue);
      Animated.timing(panelHeight, {
        toValue: newValue ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };
  
  // Function to handle date changes
  // Improved date change handler
  const handleDateChange = (date) => {
    if (date instanceof Date && !isNaN(date)) {
        const formattedDate = formatDateForAPI(date);
        console.log('formattedDate', formattedDate);
        setSelectedDate(date); // Keep the Date object for displaying
        console.log('formattedDate', formattedDate);
        setSelectedDateString(formattedDate); // Keep a string representation for API calls
    }
    setDatePickerVisibility(false);
};




  const adjustPanelHeight = isTimeFilterVisible ? 600 : 450;

  const panelHeightInterpolation = panelHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, adjustPanelHeight],
  });

 

  const resetFilters = () => {
    setTimeSlots(timeSlots.map(slot => ({ ...slot, selected: false })));
    setCustomTimeSlots([]);
    setSelectedDate(new Date());
    setMainLibelle('');
    setSousLibelle('');
    setTimeFilterVisible(false);
    setCustomTimeSlot({ start: null, end: null });
    setTimeSlotToSet(null);
    

    
  };

  const handleApplyFilters = () => {
    const selectedTimeSlot = customTimeSlots.find(slot => slot.selected) ||
                             timeSlots.find(slot => slot.selected) || 
                             { start: '00:00', end: '23:59' }; // Default to whole day if no time slot selected
    console.log('selectedDateString', selectedDateString),

    onFilterChange({
        doctorId: sousLibelle,
        date: selectedDateString,
        starttime: selectedTimeSlot.start,
        endtime: selectedTimeSlot.end
    });
};


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleFilterPanel} style={styles.filterButton}>
        <Text style={styles.filterButtonText}>{isFilterPanelOpen ? 'Filtres ▲' : 'Filtres ▼'}</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.panel, { maxHeight: panelHeightInterpolation }]}>
        <AgendaLibellePicker onServiceDoctorSelected={handleLibelleSelected} />
        <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.datePickerButton}>
          <Icon name="event" size={20} color="#fff" />
          <Text style={styles.datePickerButtonText}>{`Date: ${selectedDate.toLocaleDateString('fr-FR')}`}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          locale="fr-FR"
          onConfirm={handleDateChange}
          onCancel={() => setDatePickerVisibility(false)}
        />
        <TouchableOpacity onPress={() => setTimeFilterVisible(!isTimeFilterVisible)} style={styles.timeFilterToggle}>
          <Text style={styles.timeFilterToggleText}>Filtre Horaire</Text>
          <Icon name={isTimeFilterVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={20} color="#5A709F" />
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
        {isTimeFilterVisible && (
          <ScrollView style={styles.timeSlotsContainer}>
            {timeSlots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleTimeSlotSelection(index)}
              style={[
                styles.timeSlotContainer,
                slot.selected && styles.selectedTimeSlotContainer,
              ]}
            >
              <Text
                style={[
                  styles.timeSlotText,
                  slot.selected && styles.selectedTimeSlotText,
                ]}
              >{`${slot.label}: ${slot.start} - ${slot.end}`}</Text>
            </TouchableOpacity>
          ))}
          {customTimeSlots.map((slot, index) => (
            <View key={`custom-${index}`} style={styles.timeSlotsContainer}>
              <TouchableOpacity
                onPress={() => toggleTimeSlotSelection(index, true)}
                style={[
                  styles.timeSlotContainer,
                  slot.selected && styles.selectedTimeSlotContainer,
                ]}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    slot.selected && styles.selectedTimeSlotText,
                  ]}
                >{`Autre: ${slot.start} - ${slot.end}`}</Text>
                <TouchableOpacity onPress={() => removeCustomTimeSlot(index)} style={styles.deleteButton}>
                  <Icon name="close" size={20} color="#333" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.customTimeSlotContainer}>
          <TouchableOpacity onPress={() => showTimePicker('start')} style={styles.customSlot}>
            <Text style={styles.timeSlotText}>{customTimeSlot.start || 'Début'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showTimePicker('end')} style={styles.customSlot}>
            <Text style={styles.timeSlotText}>{customTimeSlot.end || 'Fin'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={addCustomTimeSlot} style={styles.addButton}>
            <Icon name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
          </ScrollView>
        )}
        </View>
        <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={onConfirmCustomTime}
        onCancel={() => setTimePickerVisibility(false)}
      />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
            <Icon name="refresh" size={20} color="#fff" />
            <Text style={styles.resetButtonText}>Réinitialiser</Text>
          </TouchableOpacity>
        <TouchableOpacity onPress={handleApplyFilters} style={styles.applyButton}>
         <Icon name="check" size={20} color="#fff" />
         <Text style={styles.applyButtonText}>Appliquer</Text>
      </TouchableOpacity>
        </View>
      
        
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  datePickerButton: {
    backgroundColor: '#5A709F',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  datePickerButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  applyButton: {
    backgroundColor: '#ea7160',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  applyButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  filterButton: {
    backgroundColor: '#5A709F',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  filterButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  panel: {
    overflow: 'hidden',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeSlotsContainer: {
    maxHeight: 150,
  },
  timeSlotContainer: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#5A709F',
    borderRadius: 5,
    marginBottom: 5,
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTimeSlotContainer: {
    backgroundColor: '#e1e1e1',
  },
  selectedTimeSlotText: {
    color: '#000',
  },
  customTimeSlotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#5A709F',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 5,
  },
  customSlot: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  resetButton: {
    backgroundColor: '#5A709F',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5A709F',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  datePickerButtonText: {
    marginLeft: 10,
    color: '#fff',
  },
  timeFilterToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  timeFilterToggleText: {
    color: '#5A709F',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5A709F',
    padding: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    marginLeft: 10,
    color: '#fff',
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ea7160',
    padding: 10,
    borderRadius: 5,
  },
  applyButtonText: {
    marginLeft: 10,
    color: '#fff',
  },
});

export default FilterPanel;


