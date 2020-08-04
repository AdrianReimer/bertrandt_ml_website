<template>
    <section id="Help">
      <v-ons-page style="height:90vh;">
        <v-ons-list>
          <v-ons-list-header>MFCC</v-ons-list-header>
          <v-ons-card>
            <img src="https://blog.veritonic.com/wp-content/uploads/2018/03/mfcc.jpg" alt="Onsen UI" style="width: 70vw;">
            <div class="title">
              Mel-frequency cepstral coefficients
            </div>
            <div class="content">
              <a>
                In sound processing, the mel-frequency cepstrum (MFC) is a representation of the
                short-term power spectrum of a sound, based on a linear cosine transform of a log
                power spectrum on a nonlinear mel scale of frequency.
                <br>
                <br>
                Mel-frequency cepstral coefficients (MFCCs) are coefficients that collectively
                make up an MFC. They are derived from a type of cepstral representation of the
                audio clip (a nonlinear "spectrum-of-a-spectrum"). The difference between the
                cepstrum and the mel-frequency cepstrum is that in the MFC, the frequency bands
                are equally spaced on the mel scale, which approximates the human auditory
                system's response more closely than the linearly-spaced frequency bands used in
                the normal cepstrum. This frequency warping can allow for better representation
                of sound, for example, in audio compression.
                <br>
                <br>
                MFCCs are commonly derived as follows:
              </a>
              <ol>
                <li> Take the Fourier transform of (a windowed excerpt of) a signal. </li>
                <li> Map the powers of the spectrum obtained above onto the mel scale,
                     using triangular overlapping windows. </li>
                <li> Take the logs of the powers at each of the mel frequencies. </li>
                <li> Take the discrete cosine transform of the list of mel log powers,
                     as if it were a signal. </li>
                <li> The MFCCs are the amplitudes of the resulting spectrum. </li>
              </ol>
            </div>
          </v-ons-card>
        </v-ons-list>
      </v-ons-page>
    </section>
</template>
