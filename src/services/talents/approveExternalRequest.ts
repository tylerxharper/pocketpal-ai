import {Alert} from 'react-native';

/**
 * First-pass safeguard for PocketPal's built-in web tools.
 *
 * This is NOT an app-wide network firewall or data-loss prevention system.
 * Search providers, remote inference, voice and other network paths require
 * separate controls. The caller must invoke this immediately before sending.
 */
const MAX_REVIEW_CHARS = 512;

export function approveExternalRequest(
  action: 'Web search' | 'Read web page',
  value: string,
  destination: string,
): Promise<boolean> {
  // Refuse anything too long to review accurately in a native alert.
  if (!value || value.length > MAX_REVIEW_CHARS) {
    return Promise.resolve(false);
  }

  return new Promise(resolve => {
    Alert.alert(
      'Allow internet request?',
      `${action} via ${destination}\n\nExactly what will be sent:\n${value}`,
      [
        {text: 'Block', style: 'cancel', onPress: () => resolve(false)},
        {text: 'Allow', onPress: () => resolve(true)},
      ],
      {cancelable: false},
    );
  });
}
