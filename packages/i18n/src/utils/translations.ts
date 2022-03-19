/**
 * Temporary translations utility to keep track of sentences that need to be
 * properly translated.
 */

const TRANSLATIONS = {
  buttonLabelAddCard: 'Add card',
  buttonLabelPreview: 'Preview',
  buttonLabelPublish: 'Publish',
  iconButtonTitleAddImage: 'Add image',
  iconButtonTitleHand: 'Hand',
  iconButtonTitleMove: 'Move',
  iconButtonTitlePublishHistory: 'Publish history',
  iconButtonTitleSettings: 'Settings',
  iconButtonTitleText: 'Text',
  infoTextSelectCardToPlaceMedia: 'Select a card to place media.',
  panelDesignHeaderLabel: 'Design',
  panelDesignLayerPropertiesLabel: 'Layer',
  panelLayerHeaderLabel: 'Layers',
  popoverMenuPreviewOpenToNewWindow: 'Open to new window',
  popoverMenuPreviewTogglePreview: 'Toggle preview',
};

type TranslationKey = keyof typeof TRANSLATIONS;

export const t = (key: TranslationKey) => {
  return TRANSLATIONS[key];
};
