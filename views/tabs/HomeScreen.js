import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const data = [
    { id: 1, icon: 'cutlery', label: 'Feeding', time: '11 mins ago' },
    { id: 2, icon: 'bed', label: 'Sleep', time: '2 hours ago' },
    { id: 3, icon: 'tint', label: 'Diaper', time: '1 hour ago' },
    { id: 5, icon: 'heartbeat', label: 'Heart Rate', time: '30 mins ago' },
  ];

  const buttonColors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8'];
  const tabs = ['All', 'Feed', 'Sleep', 'Diaper', 'Pumping'];

  const [selectedTimelineTab, setSelectedTimelineTab] = useState('All');
  const [activeTab, setActiveTab] = useState('summary');
  const dataTime = [
    {
      date: '09-Sep-2024',
      feedings: [
        { label: 'Feeding', time: '11 mins ago' },
        { label: 'Feeding', time: '12 mins ago' },
      ],
    },
    {
      date: '10-Sep-2024',
      feedings: [
        { label: 'Feeding', time: '15 mins ago' },
      ],
    },
  ];
  
  const filterData = () => {
    if (selectedTimelineTab === 'All') return data;
    return data.filter(item => item.label === selectedTimelineTab);
  };

  const getButtonColor = (index) => buttonColors[index % buttonColors.length];

  const renderSmallCard = ({ item, index }) => (
    <View style={styles.smallCardContainer}>
      <View style={[styles.smallCard, { borderTopColor: getButtonColor(index), borderTopWidth: 3 }]}>
        <Icon name={item.icon} size={24} color="#000" />
        <Text style={styles.cardLabel}>{item.label}</Text>
        <Text style={styles.cardTime}>{item.time}</Text>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: getButtonColor(index) }]}>
          <Icon name="plus" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderTimelineItem = ({ item }) => (
    <View style={styles.timelineContainer}>
      {/* Clock Icon and Date */}
      <View style={styles.timelineDateContainer}>
        <Icon name="clock-o" size={24} color="#007bff" />
        <Text style={styles.timelineDate}>{item.date}</Text>
      </View>
      
      {/* Vertical Line */}
      <View style={styles.verticalLine} />
  
      {/* Feeding Entries */}
      {item.feedings.map((feeding, index) => (
        <View key={index} style={styles.feedingEntry}>
          <Icon name="cutlery" size={20} color="#000" />
          <View style={styles.feedingDetails}>
            <Text style={styles.feedingLabel}>{feeding.label}</Text>
            <Text style={styles.feedingTime}>{feeding.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
  

//   const renderTimelineItem = ({ item }) => (
//     <View style={styles.timelineContainer}>
//       {/* Clock Icon and Date */}
//       <View style={styles.timelineDateContainer}>
//         <Icon name="clock-o" size={24} color="#007bff" />
//         <Text style={styles.timelineDate}>{item.date}</Text>
//       </View>
  
//       {/* Vertical Line */}
//       <View style={styles.dottedLine} />
  
//       {/* Feeding Entries */}
//       {item.feedings.map((feeding, index) => (
//         <View key={index} style={styles.feedingEntry}>
//           <Icon name="cutlery" size={20} color="#000" />
//           <View style={styles.feedingDetails}>
//             <Text style={styles.feedingLabel}>{feeding.label}</Text>
//             <Text style={styles.feedingTime}>{feeding.time}</Text>
//           </View>
//         </View>
//       ))}
//     </View>
//   );
  
  return (
    <View style={styles.container}>
      {/* First Card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Icon name="child" size={24} color="#000" style={styles.icon} />
          <Text style={styles.text}>Coddle</Text>
        </View>
        <Text style={styles.text}>Hello Ayan</Text>
        <Text style={styles.cardTime}>1 year, 2 months old</Text>
      </View>

      {/* Second Card with Horizontal Scrollable List */}
      <View style={styles.secondCard}>
        <Text style={styles.cardTitle}>Track Baby's Routine</Text>
        <FlatList
          data={data}
          renderItem={renderSmallCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'summary' && styles.activeTab]}
          onPress={() => setActiveTab('summary')}
        >
          <Text style={styles.tabText}>Summary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'timeline' && styles.activeTab]}
          onPress={() => setActiveTab('timeline')}
        >
          <Text style={styles.tabText}>Timeline</Text>
        </TouchableOpacity>
      </View>

      {/* Conditional Content Rendering */}
      <View style={styles.contentContainer}>
        {activeTab === 'summary' && <Text>Summary Content</Text>}
        {activeTab === 'timeline' && (
          <>
            {/* Horizontal Tabs for Timeline */}
            <View style={styles.timelineTabsContainer}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.timelineTab, selectedTimelineTab === tab && styles.activeTimelineTab]}
                  onPress={() => setSelectedTimelineTab(tab)}
                >
                  <Text style={styles.timelineTabText}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Display List based on selected tab */}
            <FlatList
              data={dataTime}
              renderItem={renderTimelineItem}
              //keyExtractor={(item) => item.id.toString()}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f8ff',
  },
  card: {
    backgroundColor: '#f8f8ff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Android shadow
  },
  secondCard: {
    backgroundColor: '#ffcccb', // Light pink background color
    borderRadius: 10,
    padding: 16,
    paddingRight: 0,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Android shadow
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  smallCardContainer: {
    position: 'relative',
    marginRight: 16, // Add margin for horizontal spacing between cards
    paddingBottom: 20, // Increase padding to make space for the button
  },
  smallCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    width: 100, // Fixed width for each card
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  cardLabel: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  cardTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  addButton: {
    position: 'absolute',
    bottom: -20, // Slight overlap with the card
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Add shadow for button
    alignSelf: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeTab: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 10,
  },
  timelineTabsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  timelineTab: {
    marginRight: 10,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  activeTimelineTab: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  timelineTabText: {
    color: '#000',
  },
  timelineItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  timelineIconContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  timelineIcon: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 25,
  },
  timelineDetailsContainer: {
    flex: 1,
  },
  timelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timelineTime: {
    fontSize: 14,
    color: '#888',
  },

  timelineContainer: {
    paddingVertical: 10,
  },
  timelineDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  timelineDate: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  feedingEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft:50
  },
  feedingDetails: {
    marginLeft: 10,
  },
  feedingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedingTime: {
    fontSize: 14,
    color: '#888',
  },
  dottedLine: {
    width: 1,
    height: 20, // Adjust height as needed
    borderStyle: 'dotted',
    borderColor: '#ccc',
    borderWidth: 1,
    alignSelf: 'center', // Center it
    marginVertical: 5, // Spacing around the line
  },
  timelineContainer: {
    paddingVertical: 10,
    marginLeft: 20, // Adjust for indentation
  },
  timelineDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  timelineDate: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  verticalLine: {
    //height: '20%', // Make it fill the space between entries
    width: 1,
    backgroundColor: '#ccc',
    marginLeft: 12,
  },
  feedingEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: 30, // Indent feeding entries
  },
  feedingDetails: {
    marginLeft: 10,
  },
  feedingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedingTime: {
    fontSize: 14,
    color: '#888',
  },
  
});

export default HomeScreen;
