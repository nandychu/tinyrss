import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable } from 'mobx';
import { RSSFeedSource } from '../models/RSSFeedSource';

class MainStore {
  sources: string[] = [];
  selectedSourceName: string;
  selectedSource: RSSFeedSource;

  constructor() {
    makeAutoObservable(this);
    this.loadSources()
  }

  async loadSources() {
    let sourcesFromStorage = await AsyncStorage.getAllKeys();
    this.sources = [...sourcesFromStorage]
    this.selectedSourceName = sourcesFromStorage[0]
    let rawSource = await AsyncStorage.getItem(sourcesFromStorage[0])
    this.selectedSource = JSON.parse(rawSource)
  }

  async addSource(source: RSSFeedSource) {
    await AsyncStorage.setItem(source.name, JSON.stringify(source));
    this.loadSources()
  }

  getSources() {
    return this.sources;
  }

  async setSelectedSourceName(source: string) {
    this.selectedSourceName = source
    let rawSource = await AsyncStorage.getItem(source)
    this.selectedSource = JSON.parse(rawSource)
  }

  getSelectedSourceName() {
    return this.selectedSourceName
  }

  getSelectedSource() {
    return this.selectedSource
  }
}

export default new MainStore();