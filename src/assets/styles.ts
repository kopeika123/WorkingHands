import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: '#fff',
    gap: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    margin: 10,
    overflow: 'hidden',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  },
  cellContent: {
    flexDirection: 'column',
  },
  companyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  workTypeText: {
    fontSize: 14,
    color: '#666',
  }
});
