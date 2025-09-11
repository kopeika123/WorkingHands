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
    backgroundColor: 'transparent',
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
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,
  },
  companyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  workTypeText: {
    fontSize: 14,
    color: '#666',
  },
  logo: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 5,
  },
  centeredContainer: {
    marginTop: 0,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  workTypeTextDetail: {
    width: 140,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  companyTextDetail: {
    width: 140,
    textAlign: 'center',
    fontSize: 16,
  },
});
