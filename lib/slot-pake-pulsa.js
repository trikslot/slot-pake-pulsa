'use babel';

import SlotPakePulsaView from './slot-pake-pulsa-view';
import { CompositeDisposable } from 'atom';

export default {

  slotPakePulsaView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotPakePulsaView = new SlotPakePulsaView(state.slotPakePulsaViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotPakePulsaView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-pake-pulsa:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotPakePulsaView.destroy();
  },

  serialize() {
    return {
      slotPakePulsaViewState: this.slotPakePulsaView.serialize()
    };
  },

  toggle() {
    console.log('SlotPakePulsa was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
